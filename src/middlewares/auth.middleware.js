import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const authMiddleware = {
    // Protect routes
    protect: async (req, res, next) => {
        try {
            // 1) Getting token and check of it's there
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                token = req.headers.authorization.split(' ')[1];
            }

            if (!token) {
                return next(
                    new Error(
                        'You are not logged in! Please log in to get access.'
                    )
                );
            }

            // 2) Verification token
            const decoded = await promisify(jwt.verify)(
                token,
                process.env.JWT_SECRET
            );

            // 3) Check if user still exists
            const freshUser = await UserModel.findById(decoded.id);
            if (!freshUser) {
                return next(
                    new Error(
                        'The user belonging to this token does no longer exist.'
                    )
                );
            }

            // 4) Check if user changed password after the token was issued
            req.user = freshUser;
            next();
        } catch (error) {
            next(error);
        }
    },
    // Grant access to specific roles
    checkIsAdmin: async (req, res, next) => {
        try {
            if (!req?.user?.isAdmin) {
                return next(
                    new Error(
                        'You do not have permission to perform this action'
                    )
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    },
};

export default authMiddleware;
