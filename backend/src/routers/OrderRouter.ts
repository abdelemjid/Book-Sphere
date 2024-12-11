import express from "express";

const router = express.Router();

router.post("/order");
router.get("/order/:bookId");
router.get("/orders");

export default router;
