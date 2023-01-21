import express from "express";
import { addNodes, getAllNodes } from "../controllers/nodes.js";

const router = express.Router();

/* READ */
router.post("/addnode/:id", addNodes);
router.get("/all", getAllNodes);

export default router;
