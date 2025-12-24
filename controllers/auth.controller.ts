import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import prisma from "prisma";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new AppError("Champs vide", 400);

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError("Utilisateur invalide", 401);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new AppError("Mot de passe invalide", 401);

    // @ts-ignore
    const token = jwt.sign({ id: user.id }, process.env.SECRECT_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export default { signup, signin };
