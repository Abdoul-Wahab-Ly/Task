import taskController from "controllers/task.controller";

import authMiddleware from "utils/authMiddleware";
import express from "express";

const router = express.Router();

router.use(authMiddleware);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);

export default router;
