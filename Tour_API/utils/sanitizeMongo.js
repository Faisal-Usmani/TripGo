const AppError = require('./appError');

// A key is dangerous if it can be interpreted by MongoDB as a query operator
// ($gt, $ne, $where, ...) or as a dotted path traversal (a.b.c).
const isDangerousKey = key => key.startsWith('$') || key.includes('.');

// Walk a parsed request payload and collect every dangerous key, recording the
// path so the rejection message tells the caller exactly what to remove.
const collectDangerousKeys = (value, path, found, depth) => {
  if (depth > 10 || value === null || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    value.forEach((item, i) =>
      collectDangerousKeys(item, `${path}[${i}]`, found, depth + 1)
    );
    return;
  }

  Object.keys(value).forEach(key => {
    const keyPath = path ? `${path}.${key}` : key;
    if (isDangerousKey(key)) found.push(keyPath);
    collectDangerousKeys(value[key], keyPath, found, depth + 1);
  });
};

// Reject rather than silently strip: a request carrying operator syntax is
// either an attack or a client bug, and both are better surfaced than hidden.
//
// This runs BEFORE APIFeatures, which converts the bare words gte/gt/lte/lt
// into their $-prefixed form itself. Legitimate filtering is therefore
// unaffected -- only caller-supplied $ keys are blocked.
module.exports = (req, res, next) => {
  const found = [];

  collectDangerousKeys(req.body, 'body', found, 0);
  collectDangerousKeys(req.query, 'query', found, 0);
  collectDangerousKeys(req.params, 'params', found, 0);

  if (found.length > 0) {
    return next(
      new AppError(
        `Invalid characters in request. Keys may not start with '$' or contain '.': ${found.join(
          ', '
        )}`,
        400
      )
    );
  }

  next();
};
