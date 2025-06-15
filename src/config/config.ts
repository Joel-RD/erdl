import dotenv from "dotenv";

dotenv.config();

const {
    NODE_ENV,
    BASE_URL,
    LOCAL_DB,
    CLOUD_DB,
    PORT = 7261,
    APP_PROTOCOL,
    APP_DOMAIN,
    APP_SUBDOMAIN
} = process.env;

let DATABASE_DB: string;
DATABASE_DB = NODE_ENV !== "Production" ? LOCAL_DB : CLOUD_DB;

export const config = {
    CONNECTION_DB: DATABASE_DB,
    URL_LOCAl: `${BASE_URL}${PORT}`,
    PORT_SERVER: PORT,
    BASE_URL: BASE_URL,
    DEPLOY_URL: NODE_ENV === "Production" ? `${APP_PROTOCOL}://${APP_SUBDOMAIN}.${APP_DOMAIN}` : `http://localhost:${PORT}`
}
