import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check('description').exists().notEmpty().isLength({ min: 2, max: 255 }),
    check('max_points').exists().notEmpty().isLength({ min: 1, max: 255 }),
    check('instruction').exists().notEmpty().isLength({ min: 5 }),
    check('psychological_tests_id').exists().notEmpty().isLength({ min: 1, max: 50 }),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

export {
    validatorGetItem,
    validatorUpdateItem
}