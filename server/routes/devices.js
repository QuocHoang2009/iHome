import express from "express";
import {
  addDevices,
  deleteDevice,
  getAllDevices,
} from "../controllers/Devices.js";

const router = express.Router();

/* READ */
router.post("/adddevice", addDevices);
router.get("/all/:id", getAllDevices);
router.delete("/:id", deleteDevice);

export default router;
