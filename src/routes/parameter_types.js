import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { getItems, getItem, updateItem, deleteItem, createItem } from '../controllers/parameterTypes.js';
import { validatorGetItem, validatorUpdateItem, validatorCreateItem } from '../validators/parameterTypes.js';

const router = express.Router();

router.post("/", authMiddleware, checkRol(['administrador']), validatorCreateItem, createItem);

router.get("/", authMiddleware, checkRol(['administrador']), getItems);

router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItem);

router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);

router.delete("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, deleteItem);

export default router;