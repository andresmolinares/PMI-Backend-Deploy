import User from '../models/users.js';
import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';
import PsychologicalTest from '../models/psychologicalTests.js';
import { Op } from 'sequelize';
import PsychologicalProcess from '../models/psychologicalProcesses.js';
import PsychologicalTask from '../models/psychologicalTasks.js';
import Patient from '../models/patients.js';

const getReportTest = async (req, res) => {
    try {
        req = matchedData(req);

        let patients;
        if (!req.subject) {
            patients = await Patient.findAll({ 
                include: [PsychologicalTask]
            });
        } else {
            patients = await Patient.findAll({ 
                where: { subject: req.subject },
                include: [PsychologicalTask]
            });
        }

        const test = await PsychologicalTest.findOne({ where: { id: req.id }, include: [PsychologicalProcess] });

        let processes = [];
        for (let i = 0; i < test.psychological_processes.length; i++) {
            processes.push(test.psychological_processes[i].id);
        }
        
        let scores = [];
        patients.forEach(patient => {
            let score = 0;
            patient.psychological_tasks.forEach(task => {
                if (processes.includes(task.psychological_processes_id)) {
                    score += task.psychological_results.score;
                }
            });
            scores.push(score);
        });

        let sum = 0;
        scores.forEach(score => {
            sum += score;
        });

        let data = {
            test_average: Math.round((sum / scores.length) * 100) / 100,
            min_score: Math.round((Math.min(...scores)) * 100) / 100,
            max_score: Math.round((Math.max(...scores)) * 100) / 100,
            scores_test: scores,
        }

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER REPORTE DE PRUEBA', 403);
    }
}

export {
    getReportTest,
}