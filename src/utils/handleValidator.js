import { validationResult } from 'express-validator';

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        console.log(error);
        res.status(403);
        res.send({ errors: error.array() });
    }
}

export default validateResults;