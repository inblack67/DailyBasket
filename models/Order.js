const { Schema, models, model } = require('mongoose');

const OrderSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Order amount is required'],
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

module.exports = models.Order || model('Order', OrderSchema);