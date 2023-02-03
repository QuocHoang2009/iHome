import express from "express";
import {
  addDevices,
  deleteDevice,
  getAllDevices,
  linkDevices,
  updateDevice,
} from "../controllers/Devices.js";

const router = express.Router();

/* READ */
router.post("/adddevice", addDevices);
router.get("/all/:id", getAllDevices);
router.delete("/:id", deleteDevice);
router.post("/linkdevice", linkDevices);
router.patch("/", updateDevice);

export default router;
