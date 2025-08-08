import { Router } from 'express';

import { Roles } from '../const/index.js';
import userController from '../controllers/user.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { requestLimiter } from '../utils/request-limit.js';

const sallerRouter = Router();

sallerRouter
    .post(
        `/`,
        // validate(UserValidation.create),
        await userController.signUp(Roles.saller)
    )
    .post(
        `/signin`,
        requestLimiter(60, 10),
        // validate(UserValidation.signin),
        await userController.signIn(`refreshTokenSaller`, Roles.saller)
    )
    .post(
        '/token',
        await userController.generateNewToken(
            'refreshTokenSaller',
            Roles.saller
        )
    )
    .post(
        '/signout',
        AuthGuard,
        await userController.signOut('refreshTokenSaller', Roles.saller)
    )

    .get(
        '/',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin),
        await userController.findAllUser(Roles.saller)
    )
    .get(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, 'ID'),
        await userController.findByIdUser(Roles.saller)
    )

    .patch(
        '/password/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, 'ID'),
        // validate(UserValidation.password),
        await userController.updatePasswordUser(Roles.saller)
    )
    .patch(
        '/forget-password',
        // validate(UserValidation.forgetPassword),
        await userController.forgetPassword(Roles.saller)
    )
    .patch(
        '/confirm-otp',
        // validate(UserValidation.confirmOTP),
        await userController.confirmOTP()
    )
    .patch(
        '/confirm-password',
        // validate(UserValidation.confirmPassword),
        await userController.confirmPassword(Roles.saller)
    )
    .patch(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, 'ID'),
        // validate(UserValidation.update),
        await userController.updateUser(Roles.saller)
    )

    .delete(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin),
        userController.delete
    );

export default sallerRouter;
