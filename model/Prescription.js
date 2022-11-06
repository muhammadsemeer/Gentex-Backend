const mongoose = require("mongoose");

const Prescription = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    prescription: [
        {
            medication: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            days: {
                type: Number,
                required: true,
            },
            offten: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.exports("Prescription", Prescription);
