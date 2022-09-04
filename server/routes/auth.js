import express from "express";
import { msg, register, login } from "../controllers/auth";

const router = express.Router();

router.get("/", msg);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
