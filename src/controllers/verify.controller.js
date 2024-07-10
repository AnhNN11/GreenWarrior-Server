import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import userModel from '../models/user.model.js';

const VerifyController = {
    verifyAdmin: async (req, res, next) => {
        try {
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                token = req.headers.authorization.split(' ')[1];
            }
            // 2) Verification token
            const decoded = await promisify(jwt.verify)(
                token,
                process.env.JWT_SECRET
            );
            // 3) Check if user isAdmin
            const freshUser = await userModel.findById(decoded.id);
            if (freshUser.isAdmin) {
                res.status(200).json({ isAdmin: true });
            } else {
                res.status(200).json({ isAdmin: false });
            }
            next();
        } catch (error) {
            next(error);
        }
    },
};

export default VerifyController;
