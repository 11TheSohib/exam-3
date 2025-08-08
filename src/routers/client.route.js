import { Router } from 'express';

import { Roles } from '../const/index.js';
import userController from '../controllers/user.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { requestLimiter } from '../utils/request-limit.js';

const clientRouter = Router();

clientRouter
    .post(
        `/`,
        // validate(UserValidation.create),
        await userController.signUp(Roles.client)
    )
    .post(
        `/signin`,
        requestLimiter(60, 10),
        // validate(UserValidation.signin),
        await userController.signIn(`refreshTokenClient`, Roles.client)
    )
    .post(
        '/token',
        await userController.generateNewToken(
            'refreshTokenClient',
            Roles.client
        )
    )
    .post(
        '/signout',
        AuthGuard,
        await userController.signOut('refreshTokenClient', Roles.client)
    )

    .get(
        '/',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin),
        await userController.findAllUser(Roles.client)
    )
    .get(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, 'ID'),
        await userController.findByIdUser(Roles.client)
    )

    .patch(
        '/password/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, 'ID'),
        // validate(UserValidation.password),
        await userController.updatePasswordUser(Roles.client)
    )
    .patch(
        '/forget-password',
        // validate(UserValidation.forgetPassword),
        await userController.forgetPassword(Roles.client)
    )
    .patch(
        '/confirm-otp',
        // validate(UserValidation.confirmOTP),
        await userController.confirmOTP()
    )
    .patch(
        '/confirm-password',
        // validate(UserValidation.confirmPassword),
        await userController.confirmPassword(Roles.client)
    )
    .patch(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, 'ID'),
        // validate(UserValidation.update),
        await userController.updateUser(Roles.client)
    )

    .delete(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin),
        userController.delete
    );

export default clientRouter;
