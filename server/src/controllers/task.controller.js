import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from "../services/task.service.js";

export const create = async (req, res) => {
  const task = await createTask(req.user.id, req.body);
  res.status(201).json({
    success: true,
    data: task,
  });
};
export const list = async (req, res) => {
  const { tasks, pagination } = await listTasks(req.user.id, req.query);
  res.status(200).json({
    success: true,
    data: tasks,
    pagination,
  });
};
export const getOne = async (req, res) => {
  const task = await getTaskById(req.user.id, req.params.id);
  res.status(200).json({
    success: true,
    data: task,
  });
};

export const update = async (req, res) => {
  const task = await updateTask(req.user.id, req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: task,
  });
};
export const remove = async (req, res) => {
  const task = await deleteTask(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    message: "Task deleted"
  });
};
