const mongoose = require("mongoose");

const connectDB = () =>
    mongoose.connect(process.env.MONGO_URL, () => {
        console.log("MongoDB Connected");
    }); // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

module.exports = connectDB;
