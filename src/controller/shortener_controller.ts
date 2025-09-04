import express, { Request, Response } from 'express';
import { consult } from "../models/db.js";
import { safeValidateURL } from '../utils/validateURL.js';
import { errorHandler } from '../utils/errorHandler.js';
import { hashSmall } from "../utils/smallID.js"
import { config } from "../config/config.js"
import path from 'path';

const router = express();
const { BASE_URL, PORT_SERVER, DEPLOY_URL } = config;

const short = async (req: Request, res: Response): Promise<void> => {
    const { orig_url, name } = req.body;

    if (!orig_url) {
        res.status(404).json("Upps , URL provided is missing, please provide a valid URL.");
        return
    }

    if (typeof orig_url !== "string") {
        res.status(405).json("Should url valid, string is valid");
        return;
    }

    if (!safeValidateURL(orig_url)) {
        res.status(417).json('Upps! route not found, the url is not valid, try something like: https://example.com');
        return;
    }
    const urlID = `${hashSmall(orig_url)}`;
    const baseURL = DEPLOY_URL ? DEPLOY_URL : `http://${BASE_URL}${PORT_SERVER}`
    const shortURL = `${baseURL}/${urlID}`;
    const query = "INSERT INTO short_links (short_url, short_code, original_url) VALUES ($1, $2, $3)"
    const params = [shortURL, urlID, orig_url]
    await consult(query, params);
    res.json({ message: "La url a sido acortada con existo.", url_orginal: orig_url, url_acortada: shortURL })
    return
};

const redirectURl = async (req: Request, res: Response): Promise<string> => {
    const { short_url } = req.params;

    if (!short_url) {
        res.status(404).json("Upps url not found")
        return
    }
    const query = "select original_url, clicks from short_links where short_code = $1"
    const params = [short_url]
    const result = await consult(query, params);

    if (!result || !result.rows || result.rows.length === 0) {
        res.status(404).sendFile(path.join(process.cwd(), 'src', 'error.html'));
        return;
    }

    let countClicks = result.rows[0].clicks as number;
    const updateQuery = "UPDATE short_links SET clicks = $1 WHERE short_code = $2;";
    const updateParams = [countClicks + 1, short_url];
    await consult(updateQuery, updateParams);
    res.redirect(result.rows[0].original_url as string); 
    return
}

export const safeShort = errorHandler(short)
export const safeRedirectURl = errorHandler(redirectURl)
