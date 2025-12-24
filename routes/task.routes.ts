import { Router } from "express";
import taskController from "../controllers/task.controller";
import authMiddleware from "../utils/authMiddleware";

const router = Router();

// Toutes les routes ci-dessous utiliseront le middleware
router.use(authMiddleware);

router.post("/create", taskController.createTask);
router.get("/allTask", taskController.getAllTasks);
router.get("/oneTask/:id", taskController.getTask);
router.put("/updateTask/:id", taskController.updateTask);
router.delete("/deleteTask/:id", taskController.deleteTask);

export default router;
