import express from 'express';
import authMiddleware from '../middleware/session.js';
import checkRol from '../middleware/rol.js';

import { 
    createItem, 
    getItems, 
    updateItem, 
    deleteItem, 
    getItem, 
    createSupplementalData, 
    getSupplementalData, 
    updateSupplementalData,
    getLawViolation,
    createLawViolation,
    updateLawViolation,
    getPsychologicalResults,
    getPatientPsychologicalResults,
    getMriTests
} from '../controllers/patients.js';

import { 
    validatorCreateItem, 
    validatorGetItem, 
    validatorUpdateItem, 
    validatorCreateSupplData, 
    validatorUpdateSupplementalData,
    validatorCreateLawViolation,
    validatorUpdateLawViolation
} from '../validators/patients.js';

const router = express.Router();

router.post("/", authMiddleware, checkRol(['administrador']), validatorCreateItem, createItem);

router.get("/", authMiddleware, checkRol(['administrador']), getItems);

router.put("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateItem, updateItem);

router.get("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, getItem);

router.delete("/:id", authMiddleware, checkRol(['administrador']), validatorGetItem, deleteItem);

// Datos suplementarios del paciente
router.get("/:id/supplemental_data", authMiddleware, checkRol(['administrador']), validatorGetItem, getSupplementalData);

router.post("/:id/supplemental_data", authMiddleware, checkRol(['administrador']), validatorCreateSupplData, createSupplementalData);

router.put("/:id/supplemental_data", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateSupplementalData, updateSupplementalData);

// Datos de violaciones de ley del paciente
router.get("/:id/law_violation", authMiddleware, checkRol(['administrador']),validatorGetItem, getLawViolation);

router.post("/:id/law_violation", authMiddleware, checkRol(['administrador']), validatorCreateLawViolation, createLawViolation);

router.put("/:id/law_violation", authMiddleware, checkRol(['administrador']), validatorGetItem, validatorUpdateLawViolation, updateLawViolation);

//resultados de tareas cognitivas del paciente
router.get("/:id/psychological_results", authMiddleware, checkRol(['administrador']), validatorGetItem, getPsychologicalResults);

router.get("/:id/psychological_tasks/psychological_results", authMiddleware, checkRol(['administrador']), validatorGetItem, getPatientPsychologicalResults);

//MRI del paciente
router.get("/:id/mri_tests", authMiddleware, checkRol(['administrador']), validatorGetItem, getMriTests);

export default router;