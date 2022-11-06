const { Router } = require("express");
const controller = require("../controller/authController");
const validator = require("../validations/auth");

const router = Router();

router.get("/", (req, res) => res.json("Auth router"));
router.post("/login", validator.login, controller.login);
router.post("/register", controller.createHospital);

module.exports = router;
