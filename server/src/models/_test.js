import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import { User } from "./User.js";

await connectDb();

// Test 1: create a user
const u = await User.create({
  name: "Test User",
  email: "Test@Example.com",
  password: "supersecret",
});
console.log("created:", u._id, u.email);
console.log("password was hashed:", u.password !== "supersecret");
console.log("password starts with $2b$:", u.password.startsWith("$2b$"));

// Test 2: verify password comparison
console.log("compare correct:", await u.comparePassword("supersecret"));
console.log("compare wrong:", await u.comparePassword("wrong"));

// Test 3: email was lowercased
console.log("email is lowercase:", u.email === "test@example.com");

// Test 4: duplicate email throws code 11000
try {
  await User.create({
    name: "Dup",
    email: "test@example.com",
    password: "anotherpw",
  });
  console.log("❌ duplicate should have failed");
} catch (err) {
  console.log("✅ duplicate rejected, code:", err.code);
}

// Test 5: password not returned by default
const found = await User.findOne({ email: "test@example.com" });
console.log("password hidden by default:", found.password === undefined);
const withPw = await User.findOne({ email: "test@example.com" }).select(
  "+password",
);
console.log("password fetched with +select:", withPw.password !== undefined);

// Cleanup
await User.deleteMany({ email: /test@example.com/i });
await mongoose.connection.close();
process.exit(0);
