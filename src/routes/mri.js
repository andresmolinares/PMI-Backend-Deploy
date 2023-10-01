import express from 'express';
import authMiddleware from '../middleware/session.js';
import { validatorGetItemById } from '../validators/mri.js';
import { validatorGetItem } from '../validators/reportTest.js';

import { 
    getItem,
    getItems,
    reportMri, 
} from '../controllers/mri.js';

const router = express.Router();

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItemById, getItem);
router.get("/:id/subject/:subject?", authMiddleware, validatorGetItem, reportMri);

export default router;