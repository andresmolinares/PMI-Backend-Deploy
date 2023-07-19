import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';
import PsychologicalTask from '../models/psychologicalTasks.js';
import PsychologicalProcess from '../models/psychologicalProcesses.js';

const getItems = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalTask.findAll({ include: PsychologicalProcess });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER TAREAS PSICOLOGICAS', 403);
    }
}

const getItemsByProcess = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalTask.findAll({
            where: {
                psychological_processes_id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER TAREAS PSICOLOGICAS DE UN PROCESO', 403);
    }
}

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);
        console.log('-----------------------------------------------');
        console.log('ID: '+req.id);
        console.log('description: '+req.description);
        console.log('max_score: '+req.max_score);
        console.log('min_score: '+req.min_score);
        console.log('psychological_processes_id: '+req.psychological_processes_id);
        console.log('-----------------------------------------------');
        const data = await PsychologicalTask.update(req, {
            where: {
                id: req.id
            }
        });
        res.status(200).send({ data });
        console.log('-----------------------------------------------');
        console.log('Data: '+data);
        console.log('-----------------------------------------------');
    } catch (error) {
        console.log('-----------------------------------------------');
        console.log('error: '+error);
        console.log('-----------------------------------------------');
        handleHttpError(res, 'ERROR AL ACTUALIZAR TAREAS', 403);
    }
}

export {
    getItems,
    getItemsByProcess,
    updateItem
}