const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    aadhar: {
        type: String,
        required: true,
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
});

module.exports = mongoose.model("User", UserSchema);