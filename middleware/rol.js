import handleHttpError from '../utils/handleError.js';

const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        if(!checkValueRol) {
            handleHttpError(res, 'EL USUARIO NO TIENE PERMISOS', 403);
            return;
        }

        next();
    } catch (error) {
        handleHttpError(res, 'ERROR AL VERIFICAR ROLES DE USUARIO', 403);
    }
}

export default checkRol;