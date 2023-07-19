import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

const validatorCreateItem = [
    check('description').exists().notEmpty().isLength({ min: 3, max: 255 }),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

const validatorUpdateItem = [
    check('description').exists().notEmpty().isLength({ min: 3, max: 255 }),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

export { validatorCreateItem, validatorGetItem, validatorUpdateItem };