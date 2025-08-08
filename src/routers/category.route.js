import { Router } from 'express';

import { Roles } from '../const/index.js';
import categoryController from '../controllers/category.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';

const categoryRouter = Router();

categoryRouter
    .post(
        `/`,
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin),
        categoryController.create
    )

    .get(`/`, categoryController.findAll)
    .get(`/:id`, categoryController.findById)

    .patch(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.superadmin),
        categoryController.update
    )

    .delete(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.admin, Roles.superadmin),
        categoryController.delete
    );

export default categoryRouter;
