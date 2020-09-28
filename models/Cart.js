const { Schema, models, model } = require('mongoose');

const CartSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Order amount is required'],
    },
    product: {
        type: Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Which product\'s order it is?']
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Who made this order?']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = models.Cart || model('Cart', CartSchema);