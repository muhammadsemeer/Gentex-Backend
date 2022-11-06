const { Router } = require("express");
const hospitalValidation = require("../middlewares/hospitalValidation");
const {
    addDoc,
    getAllDocsList,
    getDocDetail,
} = require("../controller/hospitalController");

const router = Router();
// Add Docters
router.post("/docter", hospitalValidation, addDoc);

// List of docters in hospital
router.get("/docters", hospitalValidation, getAllDocsList);

// view details of the users and list of users under the doc
router.get("/docter/:id", hospitalValidation, getDocDetail);

module.exports = router;
