import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { getReportTest } from '../controllers/reportTest.js';
import { validatorGetItem } from '../validators/reportTest.js';

const router = express.Router();

router.get("/:id/subject/:subject?", authMiddleware, checkRol(['administrador']), validatorGetItem, getReportTest);

export default router;