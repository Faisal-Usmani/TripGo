const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  // Snapshot of what the tour cost at booking time, so later price changes
  // do not rewrite history.
  price: {
    type: Number,
    required: [true, 'Booking must have a price.']
  },
  startDate: Date,
  participants: {
    type: Number,
    default: 1,
    min: [1, 'A booking must have at least 1 participant.']
  },
  paid: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// The dominant read is "all bookings for this user".
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ tour: 1 });

bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: 'name slug imageCover price duration difficulty startLocation'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
