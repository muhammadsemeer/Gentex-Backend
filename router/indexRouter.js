const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => res.json("Hello Folks!!! Welcome onboard"));

module.exports = router;
