import express from 'express';
import { createBooking, getAllBookings, getBookings } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyUser, createBooking);
router.get('/:id', verifyUser, getBookings);
router.get('/', verifyAdmin, getAllBookings);

export default router;