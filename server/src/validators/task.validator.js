// src/validators/task.validator.js
import { z } from "zod";

const statusEnum = z.enum(["todo", "in_progress", "done"]);
const priorityEnum = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  description: z.string().trim().max(500).optional(),
  priority: priorityEnum.optional(),
  dueDate: z.coerce.date().optional(),
  tags: z
    .array(z.string().trim().min(1).max(30))
    .max(10, "Maximum 10 tags")
    .optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().max(500).optional(),
    status: statusEnum.optional(),
    priority: priorityEnum.optional(),
    dueDate: z.coerce.date().optional(),
    tags: z.array(z.string().trim().min(1).max(30)).max(10).optional(),
  })
  .strict("Unknown field not allowed");

export const listTasksQuerySchema = z.object({
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});
