import { Router } from 'express';
import { Roles } from '../const/index.js';
import flowerController from '../controllers/flower.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';

const flowerRouter = Router();

flowerRouter
    .post(
        `/`,
        AuthGuard,
        RolesGuard(Roles.saller),
        flowerController.createFLower
    )

    .get(`/sort`, flowerController.sortPriceFlowers)

    .get(
        `/user/:id`,
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, Roles.saller),
        flowerController.flowersToUser
    )

    .get(
        `/`,
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, Roles.client),
        flowerController.findAll
    )

    .get(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, Roles.saller, Roles.client),
        flowerController.findById
    )

    .put(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, Roles.saller),
        flowerController.update
    )

    .delete(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.superadmin, Roles.admin, Roles.saller),
        flowerController.delete
    );

export default flowerRouter;
