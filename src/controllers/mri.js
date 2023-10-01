import { BrainStructureMri } from '../database/asociations.js';
import BrainStructure from '../models/brainStructure.js';
import Mri from '../models/mri.js';
import Patient from '../models/patients.js';
import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';

const getItems = async (req, res) => {
    try {
        const data = await BrainStructure.findAll({
            where: {
                is_important: 1
            },
            through: {
                model: BrainStructureMri
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER PRUEBAS MRI', 403);
    }
}

const getItem = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await BrainStructure.findByPk( req.id, {
            through: {
                model: BrainStructureMri
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER PRUEBA MRI', 403);
    }
}

const reportMri = async (req, res) => {
    try {
        req = matchedData(req);

        let patients;
        if (!req.subject) {
            patients = await Patient.findAll({ 
                include: [
                    {
                        model: Mri,
                        include: [
                            {
                                model: BrainStructure,
                                where: {
                                    id: req.id
                                }
                            }
                        ]
                    }
                ]
            });
        } else {
            patients = await Patient.findAll({ 
                where: { subject: req.subject },
                include: [
                    {
                        model: Mri,
                        include: [
                            {
                                model: BrainStructure,
                                where: {
                                    id: req.id
                                }
                            }
                        ]
                    }
                ]
            });
        }

        let volumes_mri = [];
        patients.forEach(patient => {
            // console.log(`patient: ${patient.id}`);
            if (patient.mris[0]?.brain_structures) {
                volumes_mri.push(patient.mris[0]?.brain_structures[0].brain_structure_mri.volume_mm3);
            }
        });

        //get average
        const sum = volumes_mri.reduce((acumulador, valor) => acumulador + valor, 0);
        const avg = sum / volumes_mri.length;

        //get median
        const sortedArray = volumes_mri.slice().sort((a, b) => a - b);
        const middleIndex = Math.floor(volumes_mri.length / 2);
        let median;
        if (volumes_mri.length % 2 === 0) {
            median = (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
        } else {
            median = sortedArray[middleIndex];
        }

        //max and min
        const max = Math.max(...volumes_mri);
        const min = Math.min(...volumes_mri);

        let data = {
            avg: Math.round((avg) * 100) / 100,
            median: Math.round((median) * 100) / 100,
            max: Math.round((max) * 100) / 100,
            min: Math.round((min) * 100) / 100,
            volumes_mri
        }
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PRUEBA MRI', 403);
    }
}

export {
    getItems,
    getItem,
    reportMri,
}