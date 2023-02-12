import express from "express";
import {
  addHomes,
  getAllHomes,
  linkHomes,
  unLinkHome,
  getHome,
} from "../controllers/homes.js";

const router = express.Router();

/* READ */
router.post("/addhome/:id", addHomes);
router.get("/all/:id", getAllHomes);
router.get("/:id", getHome);
router.patch("/", linkHomes);
router.patch("/unlink", unLinkHome);

export default router;
