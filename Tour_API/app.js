const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
//const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
const AppError = require('./utils/appError');
const sanitizeMongo = require('./utils/sanitizeMongo');
const globalErrorHandler = require('./controller/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const bookingRouter = require('./routes/bookingRoute');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Express 5 defaults to the 'simple' query parser, which leaves
// ?price[gte]=500 as the literal key "price[gte]" and breaks APIFeatures.
// 'extended' restores nested parsing; sanitizeMongo (below) closes the
// NoSQL-injection surface that re-enabling it would otherwise open.
app.set('query parser', 'extended');

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
// app.use(helmet());

// CORS: explicit allowlist, never a bare app.use(cors()) which echoes any
// origin. CLIENT_URL may hold a comma-separated list.
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / non-browser callers (curl, Postman), which send
      // no Origin header at all.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new AppError(`Origin ${origin} is not allowed by CORS`, 403));
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection.
// Must run after the body parser and before any router.
app.use(sanitizeMongo);

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) Routing
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
