import express from "express";
import { validateToken } from "../controllers/AuthController";

const router = express.Router();

router.post("/validate-token", validateToken as express.RequestHandler);

export default router;
