module.exports = {
    login: (req, res) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).json({
                message: "email and password are required",
            });
        }

        return res.status(200).json({ message: "Login" });
    },
};
