const { Router } = require("express");
const controller = require("../controller/authController");

const router = Router();

router.get("/", (req, res) => res.json("Auth router"));
router.post("/login", controller.login);
router.post("/register", controller.createHospital);

module.exports = router;
