import { isValidObjectId } from 'mongoose';
import config from '../config/index.js';
import { AppError } from '../errors/AppError.js';
import User from '../models/user.model.js';
import crypto from '../utils/Crypo.js';
import Redis from '../utils/Redis.js';
import token from '../utils/Token.js';
import { generateOTP } from '../utils/generate-otp.js';
import { sendOTPToMail } from '../utils/send-mail.js';
import { successRes } from '../utils/success-res.js';
import { BaseController } from './base.controller.js';

class UserController {
    static checkById = BaseController.checkById;
    constructor() {
        this.delete = new BaseController(User).delete;
    }

    async signUp(role) {
        return async function (req, res, next) {
            try {
                const { username, email, phoneNumber, password } = req.body;

                const existsUsername = await User.findOne({
                    username,
                });
                if (existsUsername)
                    throw new AppError(`Username already exists`, 409);

                const existsEmail = await User.findOne({ email });
                if (existsEmail)
                    throw new AppError(`Email already exists`, 409);

                const existsPhone = await User.findOne({
                    phoneNumber,
                });

                if (existsPhone)
                    throw new AppError(`Phone number already exists`, 409);

                const hashedPass = await crypto.encrypt(password);
                delete req.body.password;

                delete req.body.password;
                const user = await User.create({
                    ...req.body,
                    hashedPass,
                    role,
                });

                return successRes(res, user);
            } catch (error) {
                next(error);
            }
        };
    }

    async signIn(cookieKey, ...roles) {
        return async function (req, res, next) {
            try {
                const { username, password } = req.body;
                const user = await User.findOne({ username });

                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }

                const isMatchPassword = await crypto.decrypt(
                    password,
                    user?.hashedPass ?? ''
                );

                if (!isMatchPassword)
                    throw new AppError(`Username or password incorrect`, 400);

                const payload = {
                    id: user.id,
                    role: user.role,
                    isActive: user.isActive,
                };
                const accessToken = token.generateAccessToken(payload);
                const refreshToken = token.generateRefreshToken(payload);

                token.writeToCookie(res, cookieKey, refreshToken, 30);

                return successRes(res, {
                    token: accessToken,
                    user,
                });
            } catch (error) {
                next(error);
            }
        };
    }

    async signOut(cookieKey, ...roles) {
        return async function (req, res, next) {
            try {
                const refreshToken = req.cookies[cookieKey];
                if (!refreshToken)
                    throw new AppError('Refresh token not found', 401);

                const verifiedToken = token.verifyToken(
                    refreshToken,
                    config.TOKEN.REFRESH_KEY
                );

                if (!verifiedToken)
                    throw new AppError('Refresh token expire', 401);

                const user = await User.findById(verifiedToken?.id);
                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }

                res.clearCookie(cookieKey);
                return successRes(res, {});
            } catch (error) {
                next(error);
            }
        };
    }

    async generateNewToken(cookieKey, ...roles) {
        return async function (req, res, next) {
            try {
                const refreshToken = req.cookies[cookieKey];
                if (!refreshToken) {
                    throw new AppError('Authorization error', 401);
                }
                const verifiedToken = token.verifyToken(
                    refreshToken,
                    config.TOKEN.REFRESH_KEY
                );
                if (!verifiedToken) {
                    throw new AppError('Refresh token expire', 401);
                }

                const user = await User.findById(verifiedToken?.id);
                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }

                const paylod = {
                    id: user._id,
                    role: user.role,
                    isActive: user.isActive,
                };
                const accessToken = token.generateAccessToken(paylod);
                return successRes(res, {
                    token: accessToken,
                });
            } catch (error) {
                next(error);
            }
        };
    }

    async updateUser(...roles) {
        return async function (req, res, next) {
            try {
                const id = req?.params.id;

                if (!isValidObjectId(id)) {
                    throw new AppError('Invalid object id', 400);
                }
                const user = await this.checkById(User, id);
                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }

                let hashedPassword = user.hashedPass;
                if (req.body?.password) {
                    if (req.user?.role != user.role) {
                        throw new AppError(
                            'Not access to change password for user',
                            403
                        );
                    }
                    hashedPassword = await crypto.encrypt(password);
                    delete req.body.password;
                }

                if (req.body?.email) {
                    const exists = await User.findOne({
                        email: req.body.email,
                    });
                    if (exists && exists.email !== req.body.email)
                        throw new AppError('Email already exists', 409);
                }

                if (req.body?.username) {
                    const exists = await User.findOne({
                        username: req.body.username,
                    });
                    if (exists && exists.username !== req.body.username)
                        throw new AppError('Username already exists', 409);
                }

                if (req.body?.phoneNumber) {
                    const exists = await User.findOne({
                        phoneNumber: req.body.phoneNumber,
                    });
                    if (exists && exists.phoneNumber !== req.body.phoneNumber)
                        throw new AppError('Phone number already exists', 409);
                }

                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        ...req.body,
                        hashedPassword,
                    },
                    { new: true }
                );

                return successRes(res, {
                    ...req.body,
                    updatedUser,
                });
            } catch (error) {
                next(error);
            }
        };
    }

    async updatePasswordUser(...roles) {
        return async function (req, res, next) {
            try {
                const id = req.params?.id;
                const user = await BaseController.checkById(User, id);
                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }

                const { oldPassword, newPassword } = req.body;
                const isMatchPassword = await crypto.decrypt(
                    oldPassword,
                    user.hashedPass
                );
                if (!isMatchPassword) {
                    throw new AppError('Incorrect old password', 400);
                }

                const hashedPass = await crypto.encrypt(newPassword);
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { hashedPass },
                    { new: true }
                );
                return successRes(res, updatedUser);
            } catch (error) {
                next(error);
            }
        };
    }

    async forgetPassword(...roles) {
        return async function (req, res, next) {
            try {
                const { email } = req.body;
                const user = await User.findOne({ email });
                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }

                const otp = generateOTP();
                sendOTPToMail(email, otp);

                await Redis.setData(email, otp);
                return successRes(res, {
                    email,
                    otp,
                    expireOTP: '5 minutes',
                });
            } catch (error) {
                next(error);
            }
        };
    }

    async confirmOTP() {
        return async function (req, res, next) {
            try {
                const { email, otp } = req.body;
                const checkOTP = await Redis.getData(email);
                if (checkOTP != otp) {
                    throw new AppError('OTP incorrect or expired', 400);
                }
                await Redis.deleteData(email);
                return successRes(res, {
                    confirmPasswordURL: config.CONFIRM_PASSWORD_URL,
                    requestMethod: 'PATCH',
                    email,
                });
            } catch (error) {
                next(error);
            }
        };
    }

    async confirmPassword(...roles) {
        return async function (req, res, next) {
            try {
                const { email, newPassword } = req.body;

                const user = await User.findOne({ email });
                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }
                const hashedPass = await crypto.encrypt(newPassword);
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { hashedPass },
                    { new: true }
                );

                return successRes(res, updatedUser);
            } catch (error) {
                next(error);
            }
        };
    }

    async findByIdUser(...roles) {
        return async function (req, res, next) {
            try {
                const id = req.params.id;

                const fields = [
                    'promocode',
                    'saller-image',
                    'payment',
                    'saller-flowers',
                    'wallet',
                    'order',
                ];

                if (!isValidObjectId(id)) {
                    throw new AppError('Invalid object id', 400);
                }

                let user = await User.findOne({ role: { $in: roles }, id });

                fields.forEach((field) => user.populate(field));

                if (!user || !roles.includes(user.role)) {
                    throw new AppError('Forbidden user', 403);
                }
                user = await user.query.exec;
                return successRes(res, user);
            } catch (error) {
                next(error);
            }
        };
    }

    async findAllUser(...roles) {
        return async function (req, res, next) {
            try {
                const admins = await User.find({ role: { $in: roles } });

                return successRes(res, admins);
            } catch (error) {
                next(error);
            }
        };
    }
}

export default new UserController();
