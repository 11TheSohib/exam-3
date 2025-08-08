import { Router } from 'express';
import { Roles } from '../const/index.js';
import deliverController from '../controllers/deliver.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';

const deliverRouter = Router();

deliverRouter
    .post(
        `/`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.superadmin),
        deliverController.create
    )

    .get(
        `/`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.superadmin),
        deliverController.findAll
    )
    .get(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.client, Roles.superadmin),
        deliverController.findById
    )

    .patch(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.superadmin),
        deliverController.update
    )

    .delete(
        `/`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.client),
        deliverController.delete
    );
export default deliverRouter;
