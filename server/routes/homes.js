import express from "express";
import {
  addHomes,
  getAllHomes,
  getAllHomesUsers,
  getHome,
  getHomeUser,
  linkHomes,
  unLinkHome,
} from "../controllers/homes.js";

const router = express.Router();

/* READ */
router.post("/addhome/:id", addHomes);
router.get("/all/:id", getAllHomes);
router.get("/allUser/:id", getAllHomesUsers);
router.get("/usershome/:userId/:homeId", getHomeUser);
router.get("/:id", getHome);
router.patch("/", linkHomes);
router.patch("/unlink", unLinkHome);

export default router;
