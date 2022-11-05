const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    aadhar: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", UserSchema);
