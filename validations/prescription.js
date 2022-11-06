const { body } = require("express-validator");
const {
    Types: { ObjectId },
} = require("mongoose");
const handleValidation = require("../middlewares/validationHandler");
const User = require("../model/User");

const create = [
    body("userId").notEmpty().withMessage("userId can't empty"),
    body("doctorId").notEmpty().withMessage("doctorId can't empty"),
    body(["userId", "doctorId"]).customSanitizer((input) => ObjectId(input)),
    body("userId").custom((input, Meta) =>
        User.findOne({
            _id: ObjectId(input),
            role: "patient",
        }).then((result) => {
            if (!result) {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(
                    `${Meta.path} invalid id no user found in this id`
                );
            }

            return true;
        })
    ),
    body("doctorId").custom((input, Meta) =>
        User.findOne({
            _id: ObjectId(input),
            role: "doctor",
        }).then((result) => {
            if (!result) {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject(
                    `${Meta.path} invalid id no doctor found in this id`
                );
            }

            return true;
        })
    ),
    handleValidation,
];

module.exports = {
    create,
};
