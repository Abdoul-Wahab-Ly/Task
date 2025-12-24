import prisma from "../prisma";
import AppError from "../utils/AppError";
import { Request, Response, NextFunction } from "express";

// Creer une tache
const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, userId } = req.body;
    if (!title) throw new AppError("Le titre est requis", 400);
    if (!userId) throw new AppError("L'ID utilisateur est requis", 400);

    const task = await prisma.task.create({
      data: { title, description, userId },
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Recuperation de tous les taches d'un utilisateur
const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    if (!userId) throw new AppError("Utilisateur non identifié", 400);

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// 3. Recupere un tache precise (par ID)
const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const task = await prisma.task.findUnique({ where: { id: Number(id) } });

    if (!task) throw new AppError("Tâche introuvable", 404);
    if (task.userId !== userId) throw new AppError("Accès non autorisé", 403);

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// 4. MAJ une tache
const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, completed, userId } = req.body;

    // Vérifier si la tâche existe et appartient à l'utilisateur
    const existTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!existTask) throw new AppError("Tâche introuvable", 404);
    if (existTask.userId !== userId)
      throw new AppError("Accès non autorisé", 403);

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, completed },
    });

    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Suppime une tache
const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const existingTask = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!existingTask) throw new AppError("Tâche introuvable", 404);
    if (existingTask.userId !== userId)
      throw new AppError("Accès non autorisé", 403);

    await prisma.task.delete({ where: { id: Number(id) } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { createTask, getAllTasks, getTask, updateTask, deleteTask };
