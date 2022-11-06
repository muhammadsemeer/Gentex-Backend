const mongoose = require("mongoose");

const connectDB = () =>
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("connected successfully");
        })
        .catch((e) => {
            console.log("DB Error", e);
        });

module.exports = connectDB;
