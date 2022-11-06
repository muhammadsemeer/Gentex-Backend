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
            medicine: {
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
            dosage: {
                type: String,
                required: true,
            },
        },
    ],
    labReports: [
        {
            testName: {
                type: String,
                required: true,
            },
            result: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.exports("Prescription", Prescription);
