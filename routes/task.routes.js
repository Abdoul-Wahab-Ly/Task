const express = require("express");
const taskCtrl = require("../controllers/task.controller");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", taskCtrl.createTask);
router.get("/", taskCtrl.getTasks);

module.exports = router;
