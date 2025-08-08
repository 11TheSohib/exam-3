import consola from 'consola';
import logger from '../helpers/log/logger.js';

export const globalErrorHandle = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    const stack = err.stack || '';

    consola.error(err);

    if (statusCode.toString().startsWith('5')) {
        logger.error(`${statusCode} ${message} ${stack}`);
    }

    return res.status(statusCode).json({
        statusCode,
        message,
    });
};
