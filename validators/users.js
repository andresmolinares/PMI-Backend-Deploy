import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

const validatorUpdateItem = [
    check('id').exists().notEmpty(),
    check('name').exists().notEmpty().isLength({ min: 3, max: 255 }),
    check('username').exists().notEmpty().isLength({ min: 3, max: 50 }),
    check('role').exists().notEmpty().isIn(['electroencefalograma', 'prueba psicologica', 'resonancia Magnetica','administrador']),
    (req, res, next) => {
        return validateResults(req, res, next) 
    }
];

export { validatorGetItem, validatorUpdateItem };