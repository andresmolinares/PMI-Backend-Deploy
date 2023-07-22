import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { getItems, getItemsByTest, updateItem } from '../controllers/psychologicalProcesses.js';
import { validatorGetItem, validatorUpdateItem } from '../validators/psychologicalProcesses.js';

const router = express.Router();

router.get("/", authMiddleware, checkRol(['administrador']), getItems);
router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItemsByTest);
router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);

export default router;