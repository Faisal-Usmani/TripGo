const Booking = require('./../models/bookingModel');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

// Create a booking for the logged-in user.
// The price is read from the tour, never from the request body -- a client
// must not be able to name its own price.
exports.createMyBooking = catchAsync(async (req, res, next) => {
  const tourId = req.body.tour || req.params.tourId;

  if (!tourId) {
    return next(new AppError('A booking must reference a tour.', 400));
  }

  const tour = await Tour.findById(tourId);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  const participants = req.body.participants || 1;
  if (participants > tour.maxGroupSize) {
    return next(
      new AppError(
        `This tour allows at most ${tour.maxGroupSize} participants.`,
        400
      )
    );
  }

  const booking = await Booking.create({
    tour: tour.id,
    user: req.user.id,
    price: tour.price * participants,
    participants,
    startDate: req.body.startDate
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: booking
    }
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      data: bookings
    }
  });
});

// Cancel a booking. Users may only remove their own; admins may remove any.
exports.deleteMyBooking = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id };
  if (req.user.role !== 'admin') filter.user = req.user.id;

  const booking = await Booking.findOneAndDelete(filter);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  res.status(204).send();
});

// Admin-only
exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
