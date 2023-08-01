import { check } from 'express-validator';
import validateResults from '../utils/handleValidator.js';

const validatorCreateItem = [
    check('id').exists().notEmpty().isLength({ min: 1, max: 20 }),
    check('subject').exists().notEmpty().isBoolean(),
    check('group').exists().notEmpty(),
    check('gender').exists().notEmpty().isIn(['m', 'f']),
    check('first_name').isLength({ max: 50 }).optional({ nullable: true }),
    check('age').exists().notEmpty().isInt(),
    check('birth_department').isLength({ max: 50 }),
    check('birth_city').isLength({ max: 50 }),
    check('socioeconomic_status').exists().notEmpty().isInt(),
    check('study_years').exists().notEmpty().isInt({ min: 0 }),
    check('users_id').exists().notEmpty().isInt({ min: 1 }),
    check('institutions_id').optional({ nullable: true }),
    check('schooling_level').exists().notEmpty()
        .isIn([
            'agrafo', 
            'preescolar', 
            'básica primaria', 
            'básica secundaria', 
            'media', 
            'técnico', 
            'universitario', 
            'postgrado',
        ]),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check('id').exists().notEmpty().isLength({ min: 1, max: 20 }),
    check('subject').exists().notEmpty().isBoolean(),
    check('gender').exists().notEmpty().isIn(['m', 'f']),
    check('orthodontic_appliance').isInt().optional({ nullable: true }),
    check('marital_status').optional({ nullable: true }),
    check('first_name').isLength({ max: 50 }).optional({ nullable: true }),
    check('first_surname').isLength({ max: 50 }).optional({ nullable: true }),
    check('second_surname').isLength({ max: 50 }).optional({ nullable: true }),
    check('birth_date').isDate().optional({ nullable: true }),
    check('birth_department').isLength({ max: 50 }).optional({ nullable: true }),
    check('birth_city').isLength({ max: 50 }).optional({ nullable: true }),
    check('study_years').exists().notEmpty().isInt({ min: 0 }),
    check('schooling_level').exists().notEmpty()
        .isIn([
            'agrafo', 
            'preescolar', 
            'básica primaria', 
            'básica secundaria', 
            'media', 
            'técnico', 
            'universitario', 
            'postgrado',
        ]),
    check('family_type')
        .optional()
        .custom((value, { req }) => {
        if (!value || value === '') {
            return true;
        }
        return [
            'nuclear',
            'extensa',
            'monoparental madre',
            'monoparental',
            'reconstituida',
            'recompuesta',
            'padres separados',
            'homoparental',
            'cuidador',
        ].includes(value);
    }),
    check('socioeconomic_status').exists().notEmpty().isInt(),
    check('users_id').exists().notEmpty().isInt({ min: 1 }),
    check('institutions_id').isInt({ min: 1 }).optional({ nullable: true }),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorCreateSupplData = [
    check('children').isBoolean(),
    check('children_quantity').isInt({ min: 0 }),
    check('sibling').isBoolean(),
    check('sibling_quantity').isInt({ min: 0 }),
    check('sibling_disciplinary_record').isBoolean(),
    check('sibling_spa_use').isBoolean(),
    check('gangster').exists().notEmpty().isBoolean(),
    check('spa_use').exists().notEmpty().isBoolean(),
    check('smokes').isBoolean(),
    check('drink_alcohol').exists().notEmpty().isBoolean(),
    check('weed').exists().notEmpty().isBoolean(),
    check('cocaine').exists().notEmpty().isBoolean(),
    check('patients_id').exists().notEmpty().isInt({ min: 1 }),
];

const validatorUpdateSupplementalData = [
    check('children').isBoolean(),
    check('children_quantity').isInt({ min: 0 }),
    check('sibling').isBoolean(),
    check('sibling_quantity').isInt({ min: 0 }),
    check('sibling_disciplinary_record').isBoolean(),
    check('sibling_spa_use').isBoolean(),
    check('gangster').exists().notEmpty().isBoolean(),
    check('spa_use').exists().notEmpty().isBoolean(),
    check('smokes').isBoolean(),
    check('drink_alcohol').exists().notEmpty().isBoolean(),
    check('weed').exists().notEmpty().isBoolean(),
    check('cocaine').exists().notEmpty().isBoolean(),
    check('patients_id').exists().notEmpty().isInt({ min: 1 }),
];

const validatorCreateLawViolation = [
    check('sentence_months').isInt({ min: 1}),
    check('admission_date').isDate(),
    check('recidivist').exists().notEmpty().isBoolean(),
    check('recidivism_quantity').isInt({ min: 0 }),
    check('patients_id').exists().notEmpty().isInt({ min: 1 }),
    check('crime_types').isArray(),
];

const validatorUpdateLawViolation = [
    check('sentence_months').isInt({ min: 1}),
    check('admission_date').isDate(),
    check('recidivist').exists().notEmpty().isBoolean(),
    check('recidivism_quantity').isInt({ min: 0 }),
    check('patients_id').exists().notEmpty().isInt({ min: 1 }),
    check('crime_types').isArray(),
];

export {
    validatorCreateItem,
    validatorGetItem,
    validatorUpdateItem,
    validatorCreateSupplData,
    validatorUpdateSupplementalData,
    validatorCreateLawViolation,
    validatorUpdateLawViolation
}