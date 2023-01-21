import express from "express";
import { addRooms, deleteRoom, getAllRooms } from "../controllers/rooms.js";

const router = express.Router();

/* READ */
router.post("/addroom", addRooms);
router.get("/all/:id", getAllRooms);
router.delete("/:id", deleteRoom);

export default router;
