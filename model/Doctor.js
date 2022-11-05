const mongoose = require("mongoose");

const Doctor = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    hospitalId: {
        type: mongoose.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
});

module.exports = mongoose.model("Doctor", Doctor);
