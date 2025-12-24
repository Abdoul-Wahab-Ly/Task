import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

// Interface pour typer le contenu du Token
interface DecodedToken {
  id: number; // ou string, selon votre schéma Prisma
  iat: number;
  exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    //Vérification de l'authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Accès refusé. Token manquant ou mal formé", 401);
    }

    const token = authHeader.split(" ")[1];

    //Vérification du Token
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as unknown as DecodedToken;

    // Pour que vos contrôleurs actuels fonctionnent (qui cherchent req.body.userId) :
    req.body.userId = decoded.id;

    next();
  } catch (err) {
    // le token est expiré ou invalide, jwt.verify lance une erreur
    next(new AppError("Session expirée ou Token invalide", 401));
  }
};

export default authMiddleware;
