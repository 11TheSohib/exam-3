import jwt from 'jsonwebtoken';
import config from '../config/index.js';

class Token {
    generateAccessToken(payload) {
        return jwt.sign(payload, config.TOKEN.ACCESS_KEY);
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, config.TOKEN.REFRESH_KEY);
    }

    writeToCookie(res, key, value, expireDay) {
        res.cookie(key, value, {
            httpOnly: true,
            secure: true,
            maxAge: +expireDay * 24 * 60 * 60 * 1000,
        });
    }

    verifyToken(token, secretKey) {
        return jwt.verify(token, secretKey);
    }
}

export default new Token();
