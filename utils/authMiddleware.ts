import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import AppError from "./AppError";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new AppError("Token manquant", 401);

    const [, token] = authHeader.split(" ");
    if (!token) throw new AppError("Token invalide", 401);

    let { userId } = req.body;
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    userId = decoded.id;
    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
