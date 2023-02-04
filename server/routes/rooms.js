import express from "express";
import {
  addRooms,
  deleteRoom,
  getAllRooms,
  linkRoom,
  updateRoom,
} from "../controllers/rooms.js";

const router = express.Router();

/* READ */
router.post("/addroom", addRooms);
router.get("/all/:id", getAllRooms);
router.delete("/:id", deleteRoom);
router.post("/linkroom", linkRoom);
router.patch("/", updateRoom);

export default router;
