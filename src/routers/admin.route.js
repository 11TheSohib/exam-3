import { Router } from 'express';

import { Roles } from '../const/index.js';
import userController from '../controllers/user.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { validate } from '../middlewares/validate.js';
import { requestLimiter } from '../utils/request-limit.js';
import AdminValidation from '../validations/AdminValidation.js';

const clientRouter = Router();

clientRouter
    .post(
        `/`,
        AuthGuard,
        RolesGuard(Roles.superadmin),
        validate(AdminValidation.create),
        await userController.signUp(Roles.admin)
    )
    .post(
        `/signin`,
        requestLimiter(60, 10),
        validate(AdminValidation.signin),
        await userController.signIn(
            `refreshTokenClient`,
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )
    .post(
        '/token',
        await userController.generateNewToken(
            'refreshTokenClient',
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )
    .post(
        '/signout',
        AuthGuard,
        await userController.signOut(
            'refreshTokenClient',
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )

    .get(
        '/',
        AuthGuard,
        RolesGuard(Roles.superadmin),
        await userController.findByIdUser(
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )
    .get(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, 'ID'),
        await userController.findByIdUser(
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )

    .patch(
        '/password/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, 'ID'),
        validate(AdminValidation.password),
        await userController.updatePasswordUser(
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )
    .patch(
        '/forget-password',
        validate(AdminValidation.forgetPassword),
        await userController.forgetPassword(
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )
    .patch(
        '/confirm-otp',
        validate(AdminValidation.confirmOTP),
        await userController.confirmOTP()
    )
    .patch(
        '/confirm-password',
        validate(AdminValidation.confirmPassword),
        await userController.confirmPassword(
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )
    .patch(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, 'ID'),
        validate(AdminValidation.update),
        await userController.updateUser(
            Roles.admin,
            Roles.superadmin,
            Roles.client
        )
    )

    .delete(
        '/:id',
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, Roles.client),
        userController.delete
    );

export default clientRouter;
