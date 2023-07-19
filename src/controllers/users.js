import User from '../models/users.js';
import handleHttpError from '../utils/handleError.js';
import { matchedData } from 'express-validator';
import { Op } from 'sequelize';

const getItems = async (req, res) => {
    try {
        const data = await User.findAll();
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER USUARIOS', 403);
    }

};

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await User.findByPk(id)
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL OBTENER USUARIO', 403);
    }
};

const updateItem = async (req, res) => {
    try {
        req = matchedData(req);

        let userExist = await User.findOne({
            where: {
                [Op.and]: [
                    { username: req.username },
                    { id: { [Op.ne]: req.id } }
                ]
            }
        });

        if (userExist !== null) {
            handleHttpError(res, 'EL USUARIO YA EXISTE', 403);
            return;
        }

        const data = await User.update(req, { 
            where: {
                id: req.id
            }
        });
        
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ACTUALIZAR USUARIO', 403);
    }
};

const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await User.destroy({ where: { id } });
        res.status(200).send({ data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ELIMINAR USUARIO', 403);
    }
};

export {
    getItems,
    getItem,
    updateItem,
    deleteItem
}