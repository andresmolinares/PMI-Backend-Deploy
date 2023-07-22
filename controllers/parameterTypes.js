import { matchedData } from 'express-validator';
import handleHttpError from '../utils/handleError.js';
import ParameterTypes from '../models/parameterTypes.js';

const getItems = async (req, res) => {
    try {
        const data = await ParameterTypes.findAll();
        res.status(200).send({ data }); //El error esta saliendo de aqui
    } catch (error) {
        console.log('ERROR: '+error);
        handleHttpError(res, 'ERROR AL OBTENER TIPOS DE PARAMETROS', 403);
    }

};

const getItem = async (req, res) => {
    try {
        console.log('Entro a getItem 2');
        req = matchedData(req);
        const { id } = req;
        const data = await ParameterTypes.findByPk(id)
        res.status(200).send({ data });
    } catch (error) {
        console.log('ERROR-2: '+error);
        handleHttpError(res, 'ERROR AL OBTENER TIPOS DE PARAMETROS 2', 403);
    }
};

const createItem = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await ParameterTypes.create(req);
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL CREAR TIPO DE PARÁMETRO', 403);
    }
}

/*const updateItem = async (req, res) => {
    try {
        req = matchedData(req);

        let userExist = await ParameterTypes.findOne({
            where: {
                [Op.and]: [
                    { description: req.description },
                    { id: { [Op.ne]: req.id } }
                ]
            }
        });

        if (userExist !== null) {
            handleHttpError(res, 'EL TIPO DE PARAMETRO YA EXISTE', 403);
            return;
        }

        const data = await ParameterTypes.update(req, { 
            where: {
                id: req.id
            }
        });
        
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR TIPO DE PARAMETRO', 403);
    }
};*/

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);
        const data = await ParameterTypes.update(req, {
            where: {
                id: req.id
            }
        });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR TIPO DE PARÁMETRO', 403);
    }
}

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await ParameterTypes.destroy({ where: { id } });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ELIMINAR TIPO DE PARAMETRO', 403);
    }
};


export {
    createItem,
    getItems,
    updateItem,
    deleteItem,
    getItem
}