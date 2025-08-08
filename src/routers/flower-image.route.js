import { Router } from 'express';
import { Roles } from '../const/index.js';
import flowerImageController from '../controllers/flower-image.controller.js';
import { AuthGuard } from '../guards/auth.guard.js';
import { RolesGuard } from '../guards/role.guard.js';
import { uploadFile } from '../middlewares/file-upload.js';

const flowerIMGRouter = Router();

flowerIMGRouter
    .post(
        `/`,
        AuthGuard,
        RolesGuard(Roles.saller, Roles.admin, Roles.superadmin),
        uploadFile.single(`file`),
        flowerImageController.craetImage
    )

    .get(
        `/`,
        AuthGuard,
        RolesGuard(Roles.seller, Roles.admin, Roles.superadmin),
        flowerImageController.findAll
    )

    .get(`/:id`, AuthGuard, flowerImageController.findById)

    .patch(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.saller, Roles.admin, Roles.superadmin),
        uploadFile.single(`file`),
        flowerImageController.update
    )

    .delete(
        `/:id`,
        AuthGuard,
        RolesGuard(Roles.saller, Roles.admin, Roles.superadmin),
        flowerImageController.delete
    );

export default flowerIMGRouter;
