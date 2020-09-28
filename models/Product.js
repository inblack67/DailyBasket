const { Schema, models, model } = require('mongoose');

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Which category does this product belong to?']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = models.Product || model('Product', ProductSchema);