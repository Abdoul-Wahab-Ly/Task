const express = require("express");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.post("/sign-up", auth.signup);
router.post("/sign-in", auth.signin);

module.exports = router;
