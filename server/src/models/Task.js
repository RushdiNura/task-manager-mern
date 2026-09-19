import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, min: 1, max: 100 },
    description: { type: String, max: 500 },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    tags: { type: [String] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

taskSchema.pre("save", function () {
  if (this.isModified("status")) {
    this.completedAt = this.status === "done" ? new Date() : undefined;
  }
});

export const Task = mongoose.model("Task", taskSchema);
