import express from "express";
import { safeRedirectURl } from "../controller/shortener_controller.js"
import { redirectShort } from "../utils/limitClicks.js"

const router = express.Router();

router.get("/:short_url", redirectShort, safeRedirectURl)

export default router;
