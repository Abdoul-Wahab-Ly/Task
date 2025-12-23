import prisma from "prisma";
import AppError from "utils/AppError";
import { Request, Response, NextFunction } from "express";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, userId } = req.body;
    if (!title) throw new AppError("Title requis", 400);

    const task = await prisma.task.create({
      data: { title, description, userId },
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const tasks = await prisma.task.findMany({ where: { userId } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export default { createTask, getTasks };
