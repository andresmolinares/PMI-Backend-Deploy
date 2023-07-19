import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

const validatorUpdateItem = [
    check('description').exists().notEmpty().isLength({ min: 1, max: 255 }),
    check('code').exists().notEmpty().isLength({ min: 1, max: 50 }),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

const validatorCreateParameter = [
    check('description').exists().notEmpty().isLength({ min: 1, max: 255 }),
    check('code').exists().notEmpty().isLength({ min: 1, max: 50 }),
    check('parameter_types_id').exists().notEmpty().isLength({ min: 1, max: 50 }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

export { validatorGetItem, validatorUpdateItem, validatorCreateParameter };