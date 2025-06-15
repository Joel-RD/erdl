import pg from "pg";
import { config } from "../config/config.js"
import { errorHandles } from "../utils/errorHandler.js";

const { Pool } = pg;
const { CONNECTION_DB } = config;

const connection = async () => {
    try {
        console.log("Database connected.")
        return new Pool({
            connectionString: CONNECTION_DB
        })
    } catch (error) {
        console.log("DB connection error: ", error);
    }
}

const pool = connection();

const execute = async (sql: string, params?: unknown[]) => {
    if (!sql) {
        throw new Error("El parámetro 'sql' es obligatorio para ejecutar la consulta.");
    }
    const result = (await pool).query(sql, params);
    return result;
}

export const safeExecute = errorHandles(execute)
