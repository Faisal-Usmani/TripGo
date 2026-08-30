const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');

dotenv.config({ path: './config.env' });

// Mirror server.js: the Atlas SRV lookup fails on networks whose resolver
// does not return SRV records.
dns.setServers(['8.8.8.8']);
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const local_DB = process.env.DATABASE_LOCAL;

// Default to the same database the server uses. Pass --local to target
// DATABASE_LOCAL instead. Previously this always connected to the local DB
// while computing (and ignoring) the Atlas string above.
const target = process.argv.includes('--local') ? local_DB : DB;

// useNewUrlParser / useCreateIndex / useFindAndModify were removed in
// Mongoose 6; passing them to Mongoose 8 throws before anything runs.
mongoose
  .connect(target)
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

//IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Successfully Data Added..!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

//DELETE DATA FROM DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Successfully Data Deleted..!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
