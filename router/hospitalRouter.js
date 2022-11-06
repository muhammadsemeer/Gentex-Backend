const { Router } = require("express");
const roleValidator = require("../middlewares/roleValidation");
const {
    addDoc,
    getAllDocsList,
    getDocDetail,
    getSuperAdminDashboardData,
} = require("../controller/hospitalController");

const router = Router();

// Datas  for superAdmin Dashboard
router.get("/", roleValidator("admin"), getSuperAdminDashboardData);

// Add Doctors
router.post("/doctor", roleValidator("hospital"), addDoc);

// List of doctors in hospital
router.get("/doctors", roleValidator("hospital"), getAllDocsList);

// view details of the users and list of users under the doc
router.get("/doctor/:id", roleValidator("hospital"), getDocDetail);

module.exports = router;
