import express from "express";
import { getUsers } from "../controllers/users.js"
import { signup } from "../controllers/authController.js"

const router = express.Router();

router.get("/", getUsers);
router.post("/signup", signup);

export default router;
