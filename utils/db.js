const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
        console.log("Database Connected");
        return Promise.resolve();
    } catch (err) {
        return Promise.reject();
    }
};

module.exports = connectDB;
