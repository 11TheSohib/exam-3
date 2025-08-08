import { disconnect } from 'mongoose';

import config from '../config/index.js';
import { Roles } from '../const/index.js';
import { connectDB } from '../db/index.js';
import User from '../models/user.model.js';
import crypto from '../utils/Crypo.js';

(async function () {
    try {
        await connectDB();
        const hashedPass = await crypto.encrypt(config.SUPERADMIN.PASSWORD);
        await User.create({
            fullName: config.SUPERADMIN.FULLNAME,
            username: config.SUPERADMIN.USERNAME,
            email: config.SUPERADMIN.EMAIL,
            hashedPass,
            role: Roles.superadmin,
            phoneNumber: config.SUPERADMIN.PHONENUMBER,
        });
        console.log('Super admin success created');
        await disconnect();
    } catch (error) {
        console.log('Error on creating super amdin', error);
    }
})();
