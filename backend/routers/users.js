import express from 'express';
const router = express.Router();
import { createUser, getAllUser, deleteUser, getSingleUser, updateUser } from './../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', deleteUser);

router.get('/:id', verifyUser, getSingleUser);

router.get('/', verifyAdmin, getAllUser);

export default router;