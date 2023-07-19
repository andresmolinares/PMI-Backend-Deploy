import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { validatorGetItem, validatorUpdateItem, validatorCreateParameter } from '../validators/parameters.js';
import { getItems, getItem, updateItem, deleteItem, getItemsByType, createParameter } from'../controllers/parameters.js';

const router = express.Router();

router.get("/", authMiddleware, checkRol(['administrador']), getItems);

router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItem);

router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);

router.delete("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, deleteItem);

router.get("/type/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItemsByType);

router.post("/", authMiddleware, checkRol(['administrador']), validatorCreateParameter, createParameter);

export default router;