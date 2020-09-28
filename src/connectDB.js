const mongoose = require('mongoose');
require('colors');

exports.connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo is here`.blue.bold);
    } catch (err) {
        console.error(`${err}`.red.bold)
    }
}