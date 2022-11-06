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

// eslint-disable-next-line no-multi-assign, no-undef
module.exports = User = mongoose.model("User", UserSchema);
