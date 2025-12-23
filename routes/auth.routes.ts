import authController from "../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/sign-up", authController.signup);
router.post("/sign-in", authController.signin);

export default { router };
