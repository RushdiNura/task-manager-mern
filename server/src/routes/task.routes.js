import express from "express";
import { create, getOne, list, remove, update } from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.js";
import {
  createTaskSchema,
  listTasksQuerySchema,
  updateTaskSchema,
} from "../validators/task.validator.js";
import { validate } from "../middleware/validate.js";
import { objectIdSchema } from "../validators/params.validator.js";

export const taskRouter = express.Router();
taskRouter.use(protect); // ← ALL routes below are protected
taskRouter.post("/", validate({ body: createTaskSchema }), create);
taskRouter.get("/", validate({ query: listTasksQuerySchema }), list);
taskRouter.get("/:id", validate({ params: objectIdSchema }),getOne);
taskRouter.patch(
  "/:id",
  validate({ params: objectIdSchema, body: updateTaskSchema }),
  update,
);
taskRouter.delete("/:id", validate({ params: objectIdSchema }), remove);
