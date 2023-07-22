import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { validatorGetItem, validatorUpdateItem } from '../validators/users.js';
import { getItems, getItem, updateItem, deleteItem } from '../controllers/users.js';

const router = express.Router();

router.get("/", authMiddleware, checkRol(['administrador']), getItems);

router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItem);

router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);

router.delete("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, deleteItem);

export default router;
