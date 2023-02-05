import express from "express";
import {
  addNodes,
  deleteNode,
  getAllNodes,
  getNode,
  editNode,
} from "../controllers/nodes.js";

const router = express.Router();

/* READ */
router.post("/addnode/:id", addNodes);
router.get("/all", getAllNodes);
router.delete("/:homeId/:id", deleteNode);
router.get("/:id", getNode);
router.patch("/edit/:id", editNode);

export default router;
