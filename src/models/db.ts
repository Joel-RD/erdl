import { createClient } from "@libsql/client";
import { errorHandler } from "../utils/errorHandler.js";
import { config } from "../config/config.js";

const { CONNECTION_DB } = config;
const db = createClient(CONNECTION_DB);
export const consult = async (query: string, params: any[] = []) => {
    try {
        return await db.execute(query, params);
    } catch (error) {
        errorHandler(error);
    }
}