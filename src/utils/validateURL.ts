import { errorHandler } from "./errorHandler.js"

const validateURL = (url: string) => {
    if (!url) return false;
    const pattern = /^https:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/.*)?$/;
    return pattern.test(url);
}

export const safeValidateURL = errorHandler(validateURL);
