const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticate = require('../middleware/authMiddleware');

router.get('/ca', reservationController.getCalendar);

router.get('/', reservationController.getAllReservations);


router.get('/:id', reservationController.getReservationById);


router.get('/create/:id', authenticate, reservationController.getCreate);

router.post('/create', authenticate, reservationController.create);


router.put('/update/:id', reservationController.updateReservation);



module.exports = router;
