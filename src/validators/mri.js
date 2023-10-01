import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorGetItemById = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

export { validatorGetItemById };
