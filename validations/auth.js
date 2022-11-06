const { body } = require("express-validator");
const handleValidation = require("../middlewares/validationHandler");

const login = [
    body("email").isEmail().withMessage("Email Id can't be blank"),
    body("password").notEmpty().withMessage("Password Id can't be blank"),
    handleValidation,
];

const signup = [
    body("email").isEmail().withMessage("Email Id can't be blank"),
    body("password")
        .isStrongPassword({
            minLength: 4,
        })
        .withMessage(
            "Password Must Have Min 8 characters and contain atleast 1 lowercase, 1 symbols, 1 numbers, 1 uppercase"
        ),
    body("name").trim().notEmpty().withMessage("Name Can't empty"),
    body("aadhar").notEmpty().withMessage("Aadhaar Can't empty"),
    body("dob").isDate({ format: "YYYY-MM-DD" }).withMessage("Dob Can't empty"),
    body("gender").notEmpty().withMessage("Gender Can't empty"),
    body("role").notEmpty().withMessage("Role Can't empty"),
    body("phoneNumber").isMobilePhone().withMessage("PhoneNumber Can't empty"),
    handleValidation,
];

module.exports = {
    login,
    signup,
};
