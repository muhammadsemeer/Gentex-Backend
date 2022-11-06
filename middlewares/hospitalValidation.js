const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
module.exports = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
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
        next();
    } catch (err) {
        const response = err.message || "Internal Server Error!";
        return res.status(400).json({ message: response });
    }
};
