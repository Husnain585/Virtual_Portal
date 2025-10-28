// routes/users.js
import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateUser, getAllUsers);
router.get("/:id", authenticateUser, getUserById);
router.put("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);

export default router;
