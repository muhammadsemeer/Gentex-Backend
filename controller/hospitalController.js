const { Types } = require("mongoose");
const bcrypt = require("bcrypt");
const doctorModel = require("../model/Doctor");
const userModel = require("../model/User");

module.exports.addDoc = async (req, res) => {
    try {
        const {
            name,
            aadhar,
            phoneNumber,
            dob,
            gender,
            specialization,
            designation,
            tokenData,
            password,
            email,
        } = req.body;

        const pswd = await bcrypt.hash(password, 10);

        // eslint-disable-next-line new-cap
        const user = new userModel({
            name,
            aadhar,
            phoneNumber,
            dob,
            gender,
            email,
            password: pswd,
            role: "doctor",
        });

        await user.save();

        // eslint-disable-next-line new-cap
        const doc = new doctorModel({
            // eslint-disable-next-line no-underscore-dangle
            userId: user._id,
            designation,
            specialization,
            hospitalId: tokenData.userId,
        });

        await doc.save();

        return res
            .status(200)
            .json({ status: true, data: "Doctor Added Sucessfully" });
    } catch (err) {
        const response = err.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};

module.exports.getAllDocsList = async (req, res) => {
    try {
        const { tokenData } = req.body;

        const details = await userModel.findById({
            _id: tokenData.userId,
        });
        const doctors = await doctorModel
            .find({
                hospitalId: Types.ObjectId(tokenData.userId),
            })
            .populate("userId", {
                name: 1,
                email: 1,
            });

        return res
            .status(200)
            .json({ status: true, data: { details, doctors } });
    } catch (e) {
        const response = e.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};

module.exports.getDocDetail = async (req, res) => {
    try {
        return res.status(200).json({ status: true });
    } catch (err) {
        const response = err.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};

module.exports.getSuperAdminDashboardData = async (req, res) => {
    try {
        const hospitals = await userModel.find(
            { role: "hospital" },
            { password: 0 }
        );
        const doctorsCount = await userModel.find({ role: "doctor" }).count();
        const patientCount = await userModel.find({ role: "customer" }).count();

        return res.status(200).json({
            status: true,
            data: {
                doctorsCount,
                patientCount,
                hospitalCount: hospitals.length,
                hospitals,
            },
        });
    } catch (err) {
        const response = err.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};
