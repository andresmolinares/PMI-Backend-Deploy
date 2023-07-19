import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';
import PsychologicalTest from '../models/psychologicalTests.js';
import Patient from '../models/patients.js';
import PsychologicalTask from '../models/psychologicalTasks.js';
import PsychologicalProcesses from '../models/psychologicalProcesses.js';
import PsychologicalProcess from '../models/psychologicalProcesses.js';
import { PatientPsychologicalTask } from '../database/asociations.js';

const getItems = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalTest.findAll();
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PRUEBAS PSICOLOGICAS', 403);
    }
}

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await PsychologicalTest.findOne({ where: { id: req.id } });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PRUEBA PSICOLOGICA', 403);
    }
}

const saveTestResults = async (req, res) => {
    try {
        req = matchedData(req);

        if (req.results.length > 0) {
            const patient = await Patient.findOne({ 
                where: { 
                    id: req.patients_id,
                }
            });

            let tasks;
            for (let i = 0; i < req.results.length; i++) {
                tasks = await PsychologicalTask.findOne({ where: { id: req.results[i].psychological_tasks_id } });
                await patient.addPsychological_tasks(tasks, { through: { score: req.results[i].score } });
            }
        }

        res.status(200).send({ data:true });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL GUARDAR RESULTADOS DE LA PRUEBA', 403);
    }
}

const getTestResults = async (req, res) => {
    try {
        req = matchedData(req);
        const patient = await Patient.findOne({ 
            where: { id: req.patient },
            include: [PsychologicalTask]
        });

        const test = await PsychologicalTest.findOne({ where: { id: req.test }, include: [PsychologicalProcesses] });

        let processes = [];
        for (let i = 0; i < test.psychological_processes.length; i++) {
            processes.push(test.psychological_processes[i].id);
        }

        let data = [];
        for (let i = 0; i < patient.psychological_tasks.length; i++) {
            if (processes.includes(patient.psychological_tasks[i].psychological_processes_id)) {
                data.push({
                    psychological_tasks_id: patient.psychological_tasks[i].psychological_results.psychological_tasks_id,
                    score: patient.psychological_tasks[i].psychological_results.score,
                    created_at: patient.psychological_tasks[i].psychological_results.created_at,
                });
            }
        }

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER RESULTADOS DE LA PRUEBA', 403);
    }
}

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);
        console.log('req:'+req);
        const data = await PsychologicalTest.update(req, {
            where: {
                id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR PRUEBA', 403);
    }
}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await PsychologicalTest.destroy({ where: { id } });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ELIMINAR PRUEBA', 403);
    }
};

const getTestScorePatient = async (req, res) => {
    try {
        req = matchedData(req);

        const test = await PsychologicalTest.findByPk(req.id, {
            include: [{
            model: PsychologicalProcess,
            }]
        });

        if (!test) {
            handleHttpError(res, 'PRUEBA PSICOLOGICA NO ENCONTRADA', 404);
        }

        const patient = await Patient.findByPk(req.patient_id);

        if (!patient) {
            handleHttpError(res, 'PACIENTE NO ENCONTRADO', 404);
        }

        let totalScore = 0;
        for (const process of test.psychological_processes) {
            let taskResult = await Patient.findByPk(patient.id, {
                include: [{
                    model: PsychologicalTask,
                    through: PatientPsychologicalTask,
                    where: {
                        psychological_processes_id: process.id
                    }
                }],
            });

            for (const task of taskResult.psychological_tasks) {
                totalScore += task.psychological_results.score;
            }
        }

        let testScorePatient = {
            id: test.id,
            description: test.description,
            short_description: test.short_description,
            score: totalScore
        }

        res.status(200).send({ data: testScorePatient });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PRUEBA PSICOLOGICA', 403);
    }
}

export {
    getItems,
    getItem,
    saveTestResults,
    getTestResults,
    updateItem,
    deleteItem,
    getTestScorePatient
}