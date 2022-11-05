const { Router } = require("express");
const { login } = require("../controller/authController");

const router = Router();

router.get("/", (req, res) => res.json("Auth router"));
router.post("/login", login);

module.exports = router;
