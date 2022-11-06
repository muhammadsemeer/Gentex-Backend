const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const doctorModel = require("../model/Doctor");
const ErrorHandler = require("../utils/error");

module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                message: "email and password are required",
            });
        }

        try {
            const isUserExisting = await User.findOne({ email });
            if (!isUserExisting) {
                return res.status(400).json({
                    message: "User not found",
                });
            }

            const isPasswordCorrect = await bcrypt.compare(
                password,
                isUserExisting.password
            );

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: "Invalid Crendentials",
                });
            }

            const token = jwt.sign(
                {
                    userId: isUserExisting._id, // eslint-disable-line
                    role: isUserExisting.role,
                },
                process.env.JWT_SECRET || "secret"
            );

            return res.status(200).json({
                message: "Login Successful",
                token,
                user: {
                    // eslint-disable-next-line no-underscore-dangle
                    id: isUserExisting._id,
                    role: isUserExisting.role,
                    name: isUserExisting.name,
                },
            });
        } catch (err) {
            return next(new ErrorHandler(500, err.message));
        }
    },
    createHospital: async (req, res) => {
        try {
            // eslint-disable-next-line prefer-const
            let { name, email, password, phoneNumber, doctor } = req.body;

            password = await bcrypt.hash(password, 10);
            const hospital = new User({
                name,
                email,
                password,
                phoneNumber,
                role: "hospital",
            });
            await hospital.save();
            doctor.password = await bcrypt.hash(doctor.password, 10);
            const doctorUser = new User({
                name: doctor.name,
                aadhar: doctor.aadhar,
                phoneNumber: doctor.phoneNumber,
                email: doctor.email,
                password: doctor.password,
                dob: doctor.dob,
                gender: doctor.gender,
                role: "doctor",
            });

            await doctorUser.save();

            // eslint-disable-next-line new-cap
            const doc = new doctorModel({
                // eslint-disable-next-line no-underscore-dangle
                userId: doctorUser._id,
                designation: doctor.designation,
                specialization: doctor.specialization,
                // eslint-disable-next-line no-underscore-dangle
                hospitalId: hospital._id,
            });

            await doc.save();

            return res.status(200).json({
                status: true,
                message: "Hospital created successfully!",
            });
        } catch (err) {
            console.log(err);
            const response = err.message || "Internal Server Error!";
            return res.status(400).json({ message: response });
        }
    },
    // eslint-disable-next-line consistent-return
    signUp: async (req, res, next) => {
        try {
            const {
                name,
                aadhaar,
                phoneNumber,
                gender,
                dob,
                role,
                email,
                password,
            } = req.body;

            const hash = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                aadhaar,
                phoneNumber,
                gender,
                dob,
                role,
                email,
                password: hash,
            });

            const isUserExisting = await User.findOne({ email });
            if (isUserExisting) {
                return res.status(400).json({
                    message: "User Already Exists",
                });
            }

            newUser.save((err, result) => {
                if (err) return next(new ErrorHandler(500, err.message));

                const token = jwt.sign(
                    {
                        userId: result._id, // eslint-disable-line
                        role: result.role,
                    },
                    process.env.JWT_SECRET || "secret"
                );

                return res.status(200).json({
                    message: "Login Successful",
                    token,
                    user: {
                        // eslint-disable-next-line no-underscore-dangle
                        id: result._id,
                        role: result.role,
                        name: result.name,
                    },
                });
            });
        } catch (err) {
            next(new ErrorHandler(500, err.message));
        }
    },
};
