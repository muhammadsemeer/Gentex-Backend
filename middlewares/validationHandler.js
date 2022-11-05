const { validationResult } = require("express-validator");
const ErrorHandler = require("../utils/error");

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorHandler(400, "Validation Error"));
    }
    return next();
};

module.exports = handleValidation;
