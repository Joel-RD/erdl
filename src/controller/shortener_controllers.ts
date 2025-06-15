import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { safeExecute } from "../models/db.js";
import { safeValidateURL } from '../utils/validateURl.js';
import { errorHandles } from '../utils/errorHandler.js';
import { hashSmall } from "../utils/smalID.js"
import { config } from "../config/config.js"

const router = express();
const { BASE_URL, PORT_SERVER, DEPLOY_URL } = config;

const short = async (req: Request, res: Response): Promise<void> => {
    const { orig_url, name } = req.body;

    if (!orig_url) {
        res.json("Ups la url o el nombre no existe, pasa la url o el nombre faltante.").status(400)
        return
    }

    if (typeof orig_url !== "string") {
        res.status(400).json({ error: "La url o el nombre deben ser cadenas de texto." });
        return;
    }

    const urlID = `${hashSmall(orig_url)}`;
    if (safeValidateURL(orig_url)) {
        const baseURL = DEPLOY_URL ? DEPLOY_URL : `http://${BASE_URL}${PORT_SERVER}`
        const shortURL = `${baseURL}/${urlID}`;
        const query = "INSERT INTO url_shortener (short_url, url_id, original_url) VALUES ($1, $2, $3) "
        const params = [shortURL, urlID, orig_url]
        await safeExecute(query, params);
        res.json({ message: "La url a sido acortada con existo.", url_orginal: orig_url, url_acortada: shortURL })
        return
    }
    res.status(404).json({ error: 'Upps la url no es valida, intente algo como: https://ejemeplo.com' });
};

const redirectURl = async (req: Request, res: Response): Promise<void> => {
    const { short_url } = req.params;

    if (!short_url) {
        res.json("Ups la url no existe, pasa la url.").status(400)
        return
    }
    const query = "SELECT * from url_shortener where url_id = $1;"
    const params = [short_url]
    const result = await safeExecute(query, params)

    if (result.rowCount === 0) {
        res.json({ error: "Upps la url que a pasado no existe." }).status(400)
        return
    }

    const updateQuery = "UPDATE url_shortener SET clicks = clicks + 1 WHERE url_id = $1;";
    await safeExecute(updateQuery, params);

    res.redirect(result.rows[0].original_url);
    return
}


export const safeShort = errorHandles(short)
export const safeRedirectURl = errorHandles(redirectURl)
