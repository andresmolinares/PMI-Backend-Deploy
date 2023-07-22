import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorSaveResults = [
    check('results').exists().notEmpty().isArray(),
    check('patients_id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorGetResults = [
    check('test').exists().notEmpty(),
    check('patient').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check('description').exists().notEmpty().isLength({ min: 3, max: 255 }),
    check('short_description').exists().notEmpty().isLength({ min: 3, max: 255 }),
    check('test_types_id').exists().notEmpty().isLength({ min: 1, max: 50 }),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

const validatorGetScorePatient = [
    check('id').exists().notEmpty(),
    check('patient_id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

export {
    validatorGetItem,
    validatorSaveResults,
    validatorGetResults,
    validatorUpdateItem,
    validatorGetScorePatient
}