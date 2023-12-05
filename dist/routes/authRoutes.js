"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../auth/auth");
const router = express_1.default.Router();
// Create a new user
router.post("/register", auth_1.registerUser);
// Login user
router.post("/login", auth_1.loginUser);
// Get all users, designed for analytics
router.get("/get-users", auth_1.getAllUsers);
// Get user by id, to display data
router.get("/get-user/:id", auth_1.getUser);
// Change password requires a middleware (email verification) so it's different from only updating information
router.put("/change-password/:id", auth_1.changePassword);
// Update user by id
router.put("/update-user/:id", auth_1.updateUser);
// Delete a user (email verification)
router.delete('/delete-user/:id', auth_1.deleteUser);
exports.default = router;
