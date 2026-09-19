import { Task } from "../models/Task.js";
import { ApiError } from "../utils/ApiError.js";

const findOwnedTask = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) throw ApiError.notFound("Task not found");
  return task;
};

export const createTask = async (userId, data) => {
  const { title, description, priority, dueDate, tags } = data;
  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    tags,
    owner: userId,
    status: "todo",
  });
  return { task };
};

export const listTasks = async (
  userId,
  { status, priority, search, page, limit },
) => {
  const query = { owner: userId };
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Math.max(Number(limit) || 10, 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const [tasks, total] = await Promise.all([
    Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Task.countDocuments(query),
  ]);

  return {
    tasks,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  };
};

export const getTaskById = async (userId, taskId) => {
  const task = await findOwnedTask(userId, taskId);
  return { task };
};

export const updateTask = async (userId, taskId, updates) => {
  const task = await findOwnedTask(userId, taskId);
  const allowed = [
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
    "tags",
  ];
  for (const key of allowed) {
    if (updates[key] !== undefined) task[key] = updates[key];
  }
  await task.save();
  return { task };
};

export const deleteTask = async (userId, taskId) => {
  const task = await findOwnedTask(userId, taskId);
  await task.deleteOne();
  return { message: "Task deleted successfully" };
};
