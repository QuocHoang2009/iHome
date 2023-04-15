import express from "express";
import {
  addNodes,
  deleteNode,
  editNode,
  getAllNodes,
  getAllNodesRelay,
  getNode,
  getRelay,
} from "../controllers/nodes.js";

const router = express.Router();

/* READ */
router.post("/addnode/:id", addNodes);
router.get("/all/:id", getAllNodes);
router.get("/allRelay/:id", getAllNodesRelay);
router.delete("/:homeId/:id", deleteNode);
router.get("/:id", getNode);
router.patch("/edit/:id", editNode);
router.get("/relay/:id", getRelay);

export default router;
