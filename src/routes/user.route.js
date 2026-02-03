import { Router } from 'express';
import { getAll, create, getOne, remove, update, verifyEmail, login, userLogged, resetPassword, resetPasswordWithCode } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verify-token.js';

const router = Router();

router.route('/users')
    .get(verifyToken, getAll) //protected
    .post(create); //public

router.route('/users/me')
    .get(verifyToken, userLogged); //protected    

router.route('/users/login')
.post(login);  //public

router.route('/users/verify/:code')    
    .get(verifyEmail); //public

router.route('/users/:id')
    .get(verifyToken, getOne) //protected
    .put(verifyToken, update) //protected
    .delete(verifyToken, remove); //protected

router.route('/users/reset_password')
    .post(resetPassword); //public

router.route('/users/reset_password/:code')
    .post(resetPasswordWithCode); //public

export default router;