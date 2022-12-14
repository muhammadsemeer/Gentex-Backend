const Prescription = require("../model/Prescription");
const ErrorHandler = require("../utils/error");

const create = (req, res, next) => {
    try {
        const { userId, doctorId, prescription, labReports } = req.body;

        const newPrescription = new Prescription({
            userId,
            doctor: doctorId,
            prescription,
            labReports,
        });
        newPrescription.save();

        return res.json(newPrescription);
    } catch (err) {
        return next(new ErrorHandler(err.statusCode || 500, err.message));
    }
};

const getAll = async (req, res, next) => {
    try {
        const prescriptions = await Prescription.find({
            userId: req.params.userId,
        }).exec();

        return res.json({
            prescriptions,
        });
    } catch (err) {
        return next(new ErrorHandler(err.statusCode || 500, err.message));
    }
};

module.exports = {
    create,
    getAll,
};
