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
            minLength: 8,
            minLowercase: 1,
            minSymbols: 1,
            minNumbers: 1,
            minUppercase: 1,
        })
        .withMessage(
            "Password Must Have Min 8 characters and contain atleast 1 lowercase, 1 symbols, 1 numbers, 1 uppercase"
        ),
    body("name").trim().notEmpty().withMessage("Name Can't empty"),
    body("aadhaar").notEmpty().withMessage("Aadhaar Can't empty"),
    body("dob").isDate({ format: "DD-MM-YYYY" }).withMessage("Dob Can't empty"),
    body("gender").notEmpty().withMessage("Gender Can't empty"),
    body("role").notEmpty().withMessage("Role Can't empty"),
    body("phoneNumber").isMobilePhone().withMessage("PhoneNumber Can't empty"),
    handleValidation,
];

module.exports = {
    login,
    signup,
};
