const router = require("express").Router();
const validations = require("../validations/prescription");
const controller = require("../controller/prescriptionController");

router.post("/create", validations.create, controller.create);

module.exports = router;
