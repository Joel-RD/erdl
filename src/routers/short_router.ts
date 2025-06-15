import {safeShort} from "../controller/shortener_controllers.js"
import { url_Short } from "../utils/limitClick.js";
import express from "express";

const router = express.Router();

router.post("/short", url_Short, safeShort)

export default router;
