import { matchedData, body } from 'express-validator';
import { getTemplateVerifyEmail, sendVerifyEmail, sendForgotPassword, getTemplateForgotPassword } from '../config/mail.js';
import User from '../models/users.js';
import handleHttpError from '../utils/handleError.js';
import { tokenSign, verifyToken } from '../utils/handleJwt.js';
import { encrypt, compare } from '../utils/handlePassword.js';

const register = async (req, res) => {
    try {
        req = matchedData(req);

        let userExist = await User.findOne({ where: { username: req.username } });
        if (userExist !== null) {
            handleHttpError(res, 'EL USUARIO YA EXISTE', 403);
            return;
        }

        let emailExist = await User.findOne({ where: { email: req.email } });
        if (emailExist !== null) {
            handleHttpError(res, 'EL E-MAIL YA EXISTE', 403);
            return;
        }

        const password = await encrypt(req.password);
        const body = { ...req, password };
        const user = await User.create(body);
        user.password = true;

        const data = {
            token: await tokenSign(user),
            user: user,
        }

        const template = getTemplateVerifyEmail(user.name, data.token);

        await sendVerifyEmail(user.email, template);

        res.status(200).send({ data: data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL REGISTRAR USUARIO', 403);
    }
};

const login = async (req, res) => {
    try {
        req = matchedData(req);

        const user = await User.findOne({ where: { username: req.username } });
        if (user == null) {
            handleHttpError(res, 'USUARIO NO EXISTE', 401);
            return;
        }

        const password = await compare(req.password, user.password);
        if (!password) {
            handleHttpError(res, 'CONTRASEÑA INCORRECTA', 401);
            return;
        }

        if (!user.verified_at) {
            handleHttpError(res, 'E-MAIL SIN VERIFICAR', 401);
            return;
        }

        user.password = true;

        const data = {
            token: await tokenSign(user),
            user: user,
        }

        res.status(200).send({ data: data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL INTENTAR INICIAR SESION', 403);
    }
};

const verify = async (req, res) => {
    try {
        req = matchedData(req);

        const { token } = req;

        const payload = await verifyToken(token);

        if (!payload.id) {
            handleHttpError(res, 'TOKEN NO VALIDO', 401);
            return;
        }

        const user = await User.findByPk(payload.id);
        if (!user) {
            handleHttpError(res, 'USUARIO NO EXISTE', 401);
            return;
        }

        await User.update({ verified_at: Date.now() }, { where: { id: payload.id } });

        res.redirect('http://localhost:4200/?verified=true');

    } catch (error) {
        handleHttpError(res, 'ERROR AL VERIFICAR E-MAIL', 403);
    }
}

const forgotPassword = async (req, res) => {
    try {
        req = matchedData(req);
        
        const user = await User.findOne({ where: { username: req.username, email: req.email } });
        if (user == null) {
            handleHttpError(res, 'EL USUARIO O E-MAIL NO EXISTE', 401);
            return;
        }

        const data = {
            token: await tokenSign(user),
            user: user,
        }

        const template = getTemplateForgotPassword(user.name, data.token);

        await sendForgotPassword(user.email, template);

        res.status(200).send({ data: data });
    } catch (error) {
        handleHttpError(res, 'ERROR AL ENVIAR EL CORREO PARA RESTABLECIMIENTO DE CONTRASEÑA', 403);
    }
}

const resetPassword = async (req, res) => {
    try {
        req = matchedData(req);

        const { token } = req;

        const payload = await verifyToken(token);

        if (!payload.id) {
            handleHttpError(res, 'TOKEN NO VALIDO', 401);
            return;
        }

        const user = await User.findByPk(payload.id);
        if (!user) {
            handleHttpError(res, 'USUARIO NO EXISTE', 401);
            return;
        }

        res.redirect('http://localhost:4200/reset-password/' + token);
    } catch(error){
        handleHttpError(res, 'ERROR AL VALIDAR CREDENCIALES', 401);
    }
}

const updatePassword = async (req, res) => {
    try {
        const payload = req.user;
        req = matchedData(req);

        const user = await User.findOne({ where: { username: req.username, email: req.email } });
        if (user == null) {
            handleHttpError(res, 'EL USUARIO O E-MAIL NO EXISTE', 401);
            return;
        }
        
        if (payload.id !== user.id) {
            handleHttpError(res, 'USUARIO NO VALIDO', 401);
            return;
        }

        const password = await encrypt(req.password);
        const data = await User.update({ password }, { where: { id: user.id } });
        res.status(200).send({ data: data });
    } catch (error) {
        console.log(error);
        handleHttpError(res, 'ERROR AL RESTABLECER LA CONTRASEÑA', 401);
    }
}

export {
    register,
    login,
    verify,
    forgotPassword,
    resetPassword,
    updatePassword
}