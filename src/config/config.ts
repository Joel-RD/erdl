import dotenv from "dotenv";
import path from "path";

dotenv.config();

const {
    ABSOLUTE_PATH_DB,
    TURSO_DB_AUTH_TOKEN,
    NODE_ENV,
    BASE_URL,
    LOCAL_DB,
    TURSO_DB,
    PORT = 7261,
    APP_PROTOCOL,
    APP_DOMAIN,
    APP_SUBDOMAIN
} = process.env;


const database_db = () => {
    if (NODE_ENV !== "Production") {
        return {
            url: `file:${path.join(ABSOLUTE_PATH_DB, LOCAL_DB)}`,
        }
    }
    return {
        url: TURSO_DB,
        authToken: TURSO_DB_AUTH_TOKEN
    }
}

export const config = {
    CONNECTION_DB: database_db(),
    URL_LOCAl: `${BASE_URL}${PORT}`,
    PORT_SERVER: PORT,
    BASE_URL: BASE_URL,
    DEPLOY_URL: NODE_ENV === "Production" ? `${APP_PROTOCOL}://${APP_SUBDOMAIN}.${APP_DOMAIN}` : `http://localhost:${PORT}`
}