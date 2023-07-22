import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorRegister = [
    check('name').exists().notEmpty().isLength({ min: 3, max: 100 }),
    check('email').exists().notEmpty().isEmail(),
    check('username').exists().notEmpty().isLength({ min: 3, max: 50 }),
    check('password').exists().notEmpty().isLength({ min: 6, max: 100 }),
    check('role').exists().notEmpty().isIn(['electroencefalograma', 'prueba psicologica', 'resonancia Magnetica', 'administrador']),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorLogin = [
    check('username').exists().notEmpty(),
    check('password').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorVerifyToken = [
    check('token').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorForgotPassword = [
    check('username').exists().notEmpty(),
    check('email').exists().notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorResetPassword = [
    check('username').exists().notEmpty().isLength({ min: 3, max: 50 }),
    check('email').exists().notEmpty().isEmail(),
    check('password').exists().notEmpty().isLength({ min: 6, max: 100 }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

export {
    validatorRegister,
    validatorLogin,
    validatorVerifyToken,
    validatorForgotPassword,
    validatorResetPassword
};