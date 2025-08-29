import { createHash } from "crypto";
import { safeValidateURL } from "./validateURL.js"

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function toBase62(num: number, length: number): string {
  let str = "";
  while (str.length < length) {
    str = BASE62[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str;
}

export const hashSmall = (url: string, message?: string) => {
  if (!url) throw Error("URL or message not provider.");
  if (!safeValidateURL(url)) throw Error("Error en la url proporsionada.");
  const random = Math.random().toString(36).substring(2) + Date.now();
  const hash = createHash('sha256').update(url + random).digest('hex');

  // Toma los primeros 10 caracteres del hash y los convierte a base62 de 6 caracteres
  const hashNum = parseInt(hash.slice(0, 10), 16);
  const id = toBase62(hashNum, 8);
  return id;
};
