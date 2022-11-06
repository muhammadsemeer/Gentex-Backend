const { Router } = require("express");
const roleValidatior = require("../middlewares/roleValidation");
const controller = require("../controller/authController");
const validator = require("../validations/auth");

const router = Router();

// Platform Users Login
router.post("/login", controller.login);
router.post("/register", controller.createHospital);
router.post("/signup", validator.signup, controller.signUp);

// Add hospital and a doctor
router.post("/register", roleValidatior("admin"), controller.createHospital);

module.exports = router;
