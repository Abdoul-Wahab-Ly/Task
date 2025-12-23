const prisma = require("../prisma");
const AppError = require("../utils/AppError");

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) throw new AppError("Title requis", 400);

    const task = await prisma.task.create({
      data: { title, description, userId: req.userId },
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTasks };
