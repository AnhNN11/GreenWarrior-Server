import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const { Schema } = mongoose;
const { String, ObjectId, Date, Boolean, Number } = Schema.Types;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                // This only works on CREATE and SAVE!!!
                validator: function (el) {
                    return el === this.password;
                },
                message: 'Passwords are not the same!',
            },
        },
        avatarUrl: {
            type: String,
        },
        bannerUrl: {
            type: String,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
        },
        major: {
            type: ObjectId,
            ref: 'majors',
        },
        academicYear: {
            type: String,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
        },
        homeTown: {
            type: String,
        },
        facebookUrl: {
            type: String,
        },
        linkedInUrl: {
            type: String,
        },
        isActive: {
            type: String,
            default: true,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        },
        points: {
            type: Number,
            default: 0,
            required: true,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active: {
            type: Boolean,
            default: true,
            // select: false,
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

export default mongoose.model('users', userSchema);
