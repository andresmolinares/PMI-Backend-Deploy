import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';
import PsychologicalProcess from '../models/psychologicalProcesses.js';
import PsychologicalTask from '../models/psychologicalTasks.js';

const getItems = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalProcess.findAll();
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER TODOS LOS PROCESOS PSICOLOGICO', 403);
    }
}

const getItemsByTest = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalProcess.findAll({
            where: {
                psychological_tests_id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PROCESOS PSICOLOGICO DE UNA PRUEBA', 403);
    }
}

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalProcess.update(req, {
            where: {
                id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR PROCESO', 403);
    }
}

export {
    getItems,
    getItemsByTest,
    updateItem
}