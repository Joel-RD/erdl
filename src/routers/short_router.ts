import { safeShort } from "../controller/shortener_controller.js"
import { url_Short } from "../utils/limitClicks.js";
import express from "express";

const router = express.Router();

router.post("/short", url_Short, safeShort)

export default router;
