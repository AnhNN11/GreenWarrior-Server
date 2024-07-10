import crypto from 'crypto';
import admin from '../configs/firebase/firebase-config.js';

import _ from 'lodash';

import UserModel from '../models/user.model.js';

const AuthService = {
    signUp: async (req, res) => {
        console.log(req);
        0;
        const newUser = await UserModel.create(req);
        return newUser;
    },
    login: async (email, password) => {
        const user = await UserModel.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return null;
        }

        return _.pick(user, [
            '_id',
            'name',
            'email',
            'avatarUrl',
            'isAdmin',
            'firstname',
            'lastname',
        ]);
    },
    forgotPassword: async (email) => {
        const user = await UserModel.findOne({ email: email });
        return user;
    },
    resetPassword: async (req, res) => {
        console.log(req.params.token);
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');
        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        console.log('User Service');
        console.log(user);
        return user;
    },
    loginWithGoogle: async (req, res, next) => {
        try {
            const userData = req;
            const decodedToken = await admin
                .auth()
                .verifyIdToken(userData.stsTokenManager.accessToken);
            const user = await UserModel.findOne({ email: decodedToken.email });
            if (user) {
                return user;
            } else {
                return { decodedToken, user: null };
            }
        } catch (error) {
            console.log(error);
            // next(error);
        }
    },
};

export default AuthService;
