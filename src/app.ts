import express, { Request, Response, NextFunction } from "express";
import loger from "morgan";
import redirect from "../src/routers/home_routes.js"
import shortRouter from "../src/routers/short_router.js"
import "./utils/cleanupOldUrls.js";
import path from "path";
import cors from "cors"
import {config} from "./config/config.js"

const {DEPLOY_URL} = config;
const app = express();
const corsOptions = {
  origin: DEPLOY_URL,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(loger("dev"))
app.use(redirect);
app.use("/api/v1/", shortRouter);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "src/short.html"));
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).sendFile(path.join(process.cwd(), "src/error.html"))
});

export default app;
