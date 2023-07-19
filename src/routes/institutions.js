import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { getItems } from '../controllers/institutions.js';

const router = express.Router();

router.get("/", authMiddleware, checkRol(['administrador']), getItems);

export default router;