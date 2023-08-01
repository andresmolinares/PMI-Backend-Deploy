import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';
import Patient from '../models/patients.js';
import Institution from '../models/institutions.js';
import { Op } from 'sequelize';
import SupplementalData from '../models/supplementalData.js';
import LawViolation from '../models/lawViolation.js';
import Parameter from '../models/parameters.js';
import PsychologicalTask from '../models/psychologicalTasks.js';
import { BrainStructureMri, PatientPsychologicalTask } from '../database/asociations.js';
import Mri from '../models/mri.js';
import BrainStructure from '../models/brainStructure.js';

const getItems = async (req, res) => {
    try {
        const data = await Patient.findAll({ include: Institution });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PACIENTES', 403);
    }
}

const createItem = async (req, res) => {
    try {
        req = matchedData(req);

        const patient = await Patient.findOne({ where: { id: req.id } });
        if (patient !== null) {
            handleHttpError(res, 'EL CODIGO YA EXISTE', 403);
            return;
        }

        const data = await Patient.create(req);
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL CREAR PACIENTE', 403);
    }
}

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);

        const patient = await Patient.findOne({
            where: {
                [Op.and]: [
                    { id: req.id },
                    { id: { [Op.ne]: req.id } }
                ]
            }
        });

        if (patient !== null) {
            handleHttpError(res, 'EL CODIGO YA EXISTE', 403);
            return;
        }

        const data = await Patient.update(req, {
            where: {
                id: req.id
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL ACTUALIZAR PACIENTE', 403);
    }
}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await Patient.destroy({
            where: {
                id: req.id
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ELIMINAR PACIENTE', 403);
    }
}

const getItem = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await Patient.findOne({
            where: {
                id: req.id
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER PACIENTE', 403);
    }
}

// Datos suplementarios del paciente
const getSupplementalData = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await SupplementalData.findOne({
            where: {
                patients_id: req.id
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER DATOS SUPLEMENTARIOS', 403);
    }
}

const createSupplementalData = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await SupplementalData.create(req);

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL CREAR DATOS SUPLEMENTARIOS', 403);
    }
}

const updateSupplementalData = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await SupplementalData.update(req, {
            where: {
                patients_id: req.id
            }
        });
        console.log(data);

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL ACTUALIZAR DATOS SUPLEMENTARIOS', 403);
    }
}
// Violaciones de ley del paciente
const getLawViolation = async (req, res) => {
    try {
        req = matchedData(req);

        const lawViolation = await LawViolation.findOne({
            where: {
                patients_id: req.id
            }
        });

        const patient = await Patient.findOne({
            where: { id: req.id },
            include: [{ model: Parameter, where: { parameter_types_id: 20 } }]
        });

        const data = {
            lawViolation: lawViolation,
            crime_types: patient ? patient.parameters : []
        }

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER DATOS DE LAS VIOLACIONES DE LEY', 403);
    }
}

const createLawViolation = async (req, res) => {
    try {
        req = matchedData(req);
        console.log(req);

        if (req.crime_types.length > 0) {
            const patient = await Patient.findOne({ where: { id: req.patients_id } });
            let crime_type;
            for (let i = 0; i < req.crime_types.length; i++) {
                crime_type = await Parameter.findOne({ where: { id: req.crime_types[i].crime_type, parameter_types_id: 20 } });
                await patient.addParameter(crime_type);
            }
        }

        const data = await LawViolation.create(req);
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL CREAR VIOLACIONES DE LEY', 403);
    }
}

const updateLawViolation = async (req, res) => {
    try {
        req = matchedData(req);
        if (req.crime_types.length > 0) {
            const patient = await Patient.findOne({ where: { id: req.patients_id } });
            let crime_types = [];
            for (let i = 0; i < req.crime_types.length; i++) {
                crime_types.push(await Parameter.findOne({ where: { id: req.crime_types[i].crime_type, parameter_types_id: 20 } }));
            }
            await patient.setParameters(crime_types);
        } else {
            const patient = await Patient.findOne({ where: { id: req.patients_id } });
            let parameters = [];
            const patientParameters = await patient.getParameters({ where: { parameter_types_id: { [Op.ne]: 20 } } });
            for (let i = 0; i < patientParameters.length; i++) {
                parameters.push(patientParameters[i].get({ plain: true }).id);
            }
            await patient.setParameters(parameters);
        }

        const data = await LawViolation.update(req, {
            where: {
                patients_id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL ACTUALIZAR VIOLACIONES DE LEY', 403);
    }
}

//resultados de tareas cognitivas del paciente
const getPsychologicalResults = async (req, res) => {
    try {
        req = matchedData(req);

        Patient.hasMany(PsychologicalTask, { foreignKey: 'patients_id' });

        const data = await PsychologicalResult.findAll({
            where: {
                patients_id: req.id
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER RESULTADOS DE TAREAS COGNITIVAS', 403);
    }
}

const getPatientPsychologicalResults = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await Patient.findByPk(req.id, {
            include: [{ model: PsychologicalTask, through: PatientPsychologicalTask }],
        });

        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PROCESOS PSICOLOGICO DE UNA PRUEBA', 403);
    }
}

//MRI del paciente
const getMriTests = async (req, res) => {
    try {
        req = matchedData(req);

        const data = await Patient.findByPk(req.id, {
            include: {
                model: Mri,
                include: [
                    {
                        model: BrainStructure,
                        through: {
                            model: BrainStructureMri
                        }
                    }
                ] 
            }
        });

        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER PRUEBAS MRI', 403);
    }
}


export {
    createItem,
    getItems,
    updateItem,
    deleteItem,
    getItem,
    createSupplementalData,
    getSupplementalData,
    updateSupplementalData,
    getLawViolation,
    createLawViolation,
    updateLawViolation,
    getPsychologicalResults,
    getPatientPsychologicalResults,
    getMriTests
}