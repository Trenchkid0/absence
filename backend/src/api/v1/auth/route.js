import express from "express";
import { signinUser } from "./controller.js";

const router = express.Router();

router.post("/signin", signinUser);

export default router;
