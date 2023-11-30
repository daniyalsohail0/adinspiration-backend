import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
} from "../auth/auth";

const router = express.Router();

// Create a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get all users, designed for analytics
router.get("/get-users", getAllUsers);

// Get user by id, to display data
router.get("/get-user/:id", getUser);

// Change password requires a middleware (email verification) so it's different from only updating information
router.put("/change-password/:id", changePassword);

// Update user by id
router.put("/update-user/:id", updateUser);

// Delete a user (email verification)
router.delete('/delete-user/:id', deleteUser)

export default router;