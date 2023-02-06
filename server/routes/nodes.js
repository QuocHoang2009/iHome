import express from "express";
import {
  addNodes,
  deleteNode,
  editNode,
  getAllNodes,
  getNode,
} from "../controllers/nodes.js";

const router = express.Router();

/* READ */
router.post("/addnode/:id", addNodes);
router.get("/all/:id", getAllNodes);
router.delete("/:homeId/:id", deleteNode);
router.get("/:id", getNode);
router.patch("/edit/:id", editNode);

export default router;
