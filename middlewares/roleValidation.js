const jwt = require("jsonwebtoken");
const userModel = require("../model/User");

// eslint-disable-next-line consistent-return
const roleValidator = (role) => async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res
                .status(400)
                .json({ status: false, message: "token not found" });
        }

        const token = req.headers.authorization;
        const tokenData = await jwt.verify(
            token,
            process.env.JWT_SECRET || "secret"
        );
        req.body.tokenData = tokenData;

        const user = await userModel.findById({ _id: tokenData.userId });

        if (user.role === role) {
            return next();
        }
        return res
            .status(400)
            .json({ status: false, message: "Invalid Token" });
    } catch (err) {
        const response = err.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};

module.exports = roleValidator;
