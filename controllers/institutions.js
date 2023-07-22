import Institution from '../models/institutions.js';
import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';

const getItems = async (req, res) => {
    try {
        const data = await Institution.findAll();
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER CENTROS', 403);
    }
}

export { getItems }