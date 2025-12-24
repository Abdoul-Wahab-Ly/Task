import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import AppError from "../utils/AppError";
import {
  validateurEmail,
  validateurPassword,
  validateurSignin,
} from "../utils/validation";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Validations de format
    if (!name) throw new AppError("Le nom est obligatoire", 400);
    validateurEmail(email);
    validateurPassword(password);

    //
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError("Cet email est déjà utilisé", 400);

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hash },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validation de présence et de format
    validateurSignin(email, password);

    // Recherche de l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });

    // Vérification de l'utilisateur et du mot de passe
    // On utilise le même message d'erreur pour les deux cas
    if (!user) {
      throw new AppError("Email ou mot de passe incorrect", 401);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError("Le mot de passe incorrect", 401);
    }

    //Génération du token
    const secret = process.env.SECRET_KEY!;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export default { signup, signin };
