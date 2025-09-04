import express, { Request, Response, NextFunction } from "express";
import loger from "morgan";
import redirect from "./routers/home_route.js"
import shortRouter from "../src/routers/short_router.js"
import "./utils/cleanupOldUrls.js";
import path from "path";
import cors from "cors"
import {config} from "./config/config.js"

const {DEPLOY_URL, DEPLOY_URL_FRONTEND} = config;
const allowedOrigins = [DEPLOY_URL, DEPLOY_URL_FRONTEND];
const app = express();
const corsOptions = {
  origin: allowedOrigins,
}

app.set('trust proxy', true)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(loger("dev"))
app.use(redirect);
app.use("/api/v1/", shortRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile(path.join(process.cwd(), "src/error.html"));
});  
export default app;
