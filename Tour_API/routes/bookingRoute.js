const express = require('express');
const bookingController = require('./../controller/bookingController');
const authController = require('./../controller/authController');

// mergeParams so this can also mount under /tours/:tourId/bookings
const router = express.Router({ mergeParams: true });

// Everything below requires a logged-in user.
router.use(authController.protect);

router.get('/my-bookings', bookingController.getMyBookings);

router
  .route('/')
  .post(bookingController.createMyBooking)
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    bookingController.getAllBookings
  );

// Owner or admin -- ownership is enforced inside the controller.
router.delete('/:id', bookingController.deleteMyBooking);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking);

module.exports = router;
