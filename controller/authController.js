const User = require('../model/User');
const jwt = require("jsonwebtoken")


module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                message: "email and password are required",
            });
        }

        const isUserExisting = await User.findOne({ email })

        if (!isUserExisting) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, isUserExisting.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Crendentials",
            });
        }

        const token = jwt.sign({
            userId: isUserExisting._id,
            role: isUserExisting.role,
        }, process.env.JWT_SECRET || "secret")
        

        return res.status(200).json({ message: "Login Successfull", token });
    },
};
