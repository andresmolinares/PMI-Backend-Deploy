import express from 'express';
import authMiddleware from '../middleware/session.js';
import {
    validatorRegister,
    validatorLogin,
    validatorVerifyToken,
    validatorForgotPassword,
    validatorResetPassword
} from '../validators/auth.js';
import { register, login, verify, forgotPassword, resetPassword, updatePassword } from '../controllers/auth.js';

const router = express.Router();

router.post("/register", validatorRegister, register);

router.post("/login", validatorLogin, login);

router.get("/verify/:token", validatorVerifyToken, verify);

// olvide mi contraseña 
router.post("/forgot_password", validatorForgotPassword, forgotPassword);

// enlace (ubicado en correo) para el restablecimiento de contraseña
router.get("/reset_password/:token", validatorVerifyToken, resetPassword);

// actualizar contraseña
router.put("/reset_password", authMiddleware, validatorResetPassword, updatePassword);

export default router;