const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => res.json("Auth router"));
router.get("/login", (req, res) => res.json("Login"));

module.exports = router;
