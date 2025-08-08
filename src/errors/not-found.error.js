import { AppError } from './AppError.js';

export const notFoundError = (req, _res, next) => {
    const errorMessage =
        req.url.split('/')[1] === 'uploads'
            ? 'File not found'
            : 'Page not found';
    throw next(new AppError(errorMessage, 404));
};
