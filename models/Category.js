const { Schema, models, model } = require('mongoose');

const CategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category title is required'],
        unique: [true, 'Category already exists'],
        trim: true,
        maxlength: [40, 'Category title cannot be more than 40 characters']
    },
    description: {
        type: String,
        required: [true, 'Category description is required'],
        trim: true,
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

CategorySchema.pre('remove', async function (next) {
    await this.model('Product').deleteMany({ category: this._id });
    next();
});

CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

module.exports = models.Category || model('Category', CategorySchema);