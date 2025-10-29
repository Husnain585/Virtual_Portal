// routes/users.js
import express from "express";
import { getAllUsers, getSingleUser, updatePassword, deleteUser } from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, getAllUsers);
router.get("/:id", isAuthenticatedUser, getSingleUser);
router.put("/:id", isAuthenticatedUser, updatePassword);
router.delete("/:id", isAuthenticatedUser, deleteUser);

export default router;
