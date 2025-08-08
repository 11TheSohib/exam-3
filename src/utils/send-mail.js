import { createTransport } from 'nodemailer';

import consola from 'consola';
import config from '../config/index.js';
export const sendOTPToMail = (mail, otp) => {
    const transproter = createTransport({
        port: config.MAIL.PORT,
        host: config.MAIL.HOST,
        auth: {
            user: config.MAIL.USER,
            pass: config.MAIL.PASS,
        },
        secure: true,
    });

    const mailOptions = {
        from: config.MAIL.USER,
        to: mail,
        subject: 'Flowers-market',
        text: otp,
    };

    transproter.sendMail(mailOptions, function (err, info) {
        err ? consola.error(err) : consola.info(info);
    });
};
