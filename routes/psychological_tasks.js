import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { getItems, getItemsByProcess, updateItem } from '../controllers/psychologicalTasks.js';
import { validatorGetItem, validatorUpdateItem } from '../validators/psychologicalTasks.js';

const router = express.Router();

router.get("/", authMiddleware, checkRol(['administrador']), getItems);
router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItemsByProcess);
router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);

export default router;