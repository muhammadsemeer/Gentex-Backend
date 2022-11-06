const mongoose = require("mongoose");

const connectDB = () =>
    mongoose.connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
        () => {
            console.log("MongoDB Connected");
        },
        (e) => console.log(e)
    ); // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

module.exports = connectDB;
