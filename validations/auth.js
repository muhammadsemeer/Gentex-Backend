const { body } = require("express-validator");
const handleValidation = require("../middlewares/validationHandler");

const login = [
    body("email").isEmail().withMessage("Email Id can't be blank"),
    body("password")
        .isStrongPassword({
            minLength: 4,
        })
        .withMessage(
            "Password Must Have Min 8 characters and contain atleast 1 lowercase, 1 symbols, 1 numbers, 1 uppercase"
        ),
    handleValidation,
];

module.exports = {
    login,
};
