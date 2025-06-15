import express from "express";
import {safeRedirectURl} from "../controller/shortener_controllers.js"
import {redirectShort} from "../utils/limitClick.js"

const router = express.Router();

router.get("/:short_url", redirectShort ,safeRedirectURl)

export default router;
