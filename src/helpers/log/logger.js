import winston from 'winston';
import 'winston-mongodb';

const customTime = winston.format((info) => {
    const date = new Date();
    info.timestamp = date.toLocaleString('en-GB', {
        timeZone: 'Asia/Tashkent',
        hour12: false,
    });
    return info;
});

const logger = winston.createLogger({
    level: 'error',
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
    ],
    format: winston.format.combine(customTime(), winston.format.prettyPrint()),
});

export default logger;
