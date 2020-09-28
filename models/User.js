const { Schema, models, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Invalid Credentials'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be 8 chars'],
        maxlength: [16, 'Password cannot exceed 16 chars'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.pre('remove', async function (next) {
    await this.model('Order').deleteMany({ user: this._id });
    next();
});

UserSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});

UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = models.User || model('User', UserSchema);