import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';
import { getItems, getItem, saveTestResults, getTestResults, updateItem, deleteItem, getTestScorePatient } from '../controllers/psychologicalTests.js';
import { validatorGetItem, validatorGetResults, validatorGetScorePatient, validatorSaveResults, validatorUpdateItem } from '../validators/psychologicalTest.js';

const router = express.Router();

router.get("/", authMiddleware, checkRol(['administrador']), getItems);
router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItem);
router.post("/save_results", authMiddleware, checkRol(['administrador']),validatorSaveResults, saveTestResults);
router.get("/get_results/:test/patient/:patient", authMiddleware, checkRol(['administrador']), validatorGetResults, getTestResults);
router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);
router.delete("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, deleteItem);

router.get("/:id/patient/:patient_id/score", authMiddleware, checkRol(['administrador']), validatorGetScorePatient, getTestScorePatient);

export default router;