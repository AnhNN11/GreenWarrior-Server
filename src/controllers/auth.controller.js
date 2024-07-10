import AuthService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/email.js';
import _ from 'lodash';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

const AuthController = {
    signUp: async (req, res, next) => {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Some summary...'
        /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new user.',
            schema: { $ref: '#/definitions/AddUser' }
        } */
        console.log('sing');
        try {
            console.log('===========');
            console.log(req.body);
            console.log('===========');

            const newUser = await AuthService.signUp(req.body);

            const token = signToken(newUser._id);
            // #swagger.responses[200]
            res.status(200).json({
                status: 'success',
                token: token,
                user: newUser,
            });
        } catch (error) {
            next(error);
        }
    },

    login: async function (req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Please provide email and password!',
                });
            }
            const user = await AuthService.login(email, password);
            if (!user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Incorrect email or password',
                });
            }

            const token = signToken(user._id);

            res.status(200).json({
                status: 'success',
                token: token,
                user: user,
            });
        } catch (error) {
            next(error);
        }
    },
    forgotPassword: async function (req, res) {
        const { email } = req.body.data || req.body;

        if (!email) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide an email!',
            });
        }
        const user = await AuthService.forgotPassword(email);
        const resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        const resetURL = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;

        const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your password reset token (valid for 10 min)',
                message,
            });

            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!',
                resetToken,
            });
        } catch (error) {
            next(error);
        }

        // }
    },
    resetPassword: async function (req, res) {
        try {
            const user = await AuthService.resetPassword(req, res);

            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Token is invalid or has expired',
                });
            }
            user.password = req.body.password;
            user.passwordConfirm = req.body.passwordConfirm;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            createSendToken(user, 200, res);
        } catch (error) {
            next(error);
        }
    },
    loginWithGoogle: async function (req, res) {
        try {
            const user = await AuthService.loginWithGoogle(req.body);
            console.log('user:', user.user);
            if (user.user != null) {
                const token = signToken(user._id);
                console.log('token:', token);
            } else {
                return res.status(200).json({
                    method: 'SignUp',
                    message: 'User not found',
                    user: user,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    logout: async function (req, res) {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    res.status(400).send('Unable to log out');
                } else {
                    res.send('Logout successful');
                }
            });
        } else {
            res.end();
        }
    },
};

export default AuthController;
