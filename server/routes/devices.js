import express from "express";
import {
  addDevices,
  deleteDevice,
  disconnectButton,
  disconnectRelay,
  getAllDevices,
  getDevice,
  linkButton,
  linkDevices,
  updateDevice,
} from "../controllers/Devices.js";

const router = express.Router();

/* READ */
router.post("/adddevice", addDevices);
router.get("/all/:id", getAllDevices);
router.get("/:id", getDevice);
router.delete("/:id", deleteDevice);
router.post("/linkdevice", linkDevices);
router.patch("/", updateDevice);
router.patch("/disconnect", disconnectRelay);
router.patch("/linkbutton", linkButton);
router.patch("/disconnectbutton", disconnectButton);

export default router;
