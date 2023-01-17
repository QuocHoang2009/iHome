import express from "express";
import { addHomes, getAllHomes } from "../controllers/homes.js";

const router = express.Router();

/* READ */
router.post("/addhome/:id", addHomes);
router.get("/all/:id", getAllHomes);

export default router;
