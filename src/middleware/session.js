import handleHttpError from '../utils/handleError.js';
import { verifyToken } from '../utils/handleJwt.js';
import User from '../models/users.js';

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, 'TOKEN NO ENCONTRADO', 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const payload = await verifyToken(token);

        if (!payload.id) {
            handleHttpError(res, 'TOKEN NO VALIDO', 401);
            return;
        }

        const user = await User.findByPk(payload.id);
        req.user = user;
        
        next();
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR DE AUTENTICACIÓN EN MIDDLEWARE', 500);
    }
}

export default authMiddleware;