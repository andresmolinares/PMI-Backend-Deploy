import { matchedData } from 'express-validator';
import Parameter from '../models/parameters.js';
import handleHttpError from '../utils/handleError.js';
import { Op } from 'sequelize';

const getItems = async (req, res) => {
    try {
        const data = await Parameter.findAll();
        res.status(200).send({ data });
        console.log('Data:: '+data);
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER PARAMETROS', 403);
    }

};

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await Parameter.findByPk(id)
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER PARAMETRO', 403);
    }
};

/* const updateItem = async (req, res) => {
    try {
        req = matchedData(req);

        let parameterExist = await Parameter.findOne({
            where: {
                [Op.and]: [
                    { description: req.description },
                    { id: { [Op.ne]: req.id } }
                ]
            }
        });

        if (parameterExist !== null) {
            handleHttpError(res, 'EL PARAMETRO YA EXISTE', 403);
            return;
        }

        const data = await Parameter.update(req, { 
            where: {
                id: req.id
            }
        });
        
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR EL PARAMETRO', 403);
    }
}; */

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await Parameter.update(req, {
            where: {
                id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR PARÁMETRO', 403);
    }
}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await Parameter.destroy({ where: { id } });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ELIMINAR EL PARAMETRO', 403);
    }
};

const getItemsByType = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await Parameter.findAll({ where: { parameter_types_id: id } });
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL OBTENER PARAMETROS POR TIPO', 403);
    }
};

const createParameter = async (req, res) => {
    try {
        req = matchedData(req);
        
        /*const parameter = await Parameter.findOne({ where: { parameter: req.description } });
        if (parameter !== null) {
            handleHttpError(res, 'EL PARAMETRO YA EXISTE', 403);
            return;
        }*/

        const data = await Parameter.create(req);
        res.status(200).send({ data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL CREAR PARAMETRO', 403);
    }
}


export {
    getItems,
    getItem,
    updateItem,
    deleteItem,
    getItemsByType,
    createParameter
}