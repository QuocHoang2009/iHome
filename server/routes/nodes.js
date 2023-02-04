import express from "express";
import { addNodes, deleteNode, getAllNodes } from "../controllers/nodes.js";

const router = express.Router();

/* READ */
router.post("/addnode/:id", addNodes);
router.get("/all", getAllNodes);
router.delete("/:homeId/:id", deleteNode);

export default router;
