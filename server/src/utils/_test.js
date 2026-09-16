import { ApiError } from "./ApiError.js";

const err = ApiError.notFound("Task not found");
console.log(err instanceof Error); // true
console.log(err instanceof ApiError); // true
console.log(err.name); // "ApiError"
console.log(err.statusCode); // 404
console.log(err.message); // "Task not found"
console.log(err.isOperational); // true
console.log(err.stack.split("\n")[0]); // "ApiError: Task not found"
console.log(err.stack.split("\n")[1]); // points to _test.js, not ApiError.js

// Clean up
import { unlinkSync } from "fs";
// don't actually run this — just delete the file manually
