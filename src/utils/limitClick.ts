import { rateLimit } from 'express-rate-limit'

export const redirectShort = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 día en milisegundos
    limit: 1000, 
    standardHeaders: 'draft-8', 
    legacyHeaders: false,
    message: "Has alcanzado el límite diario de redirecciones. Por favor, inténtalo de nuevo mañana."
})

export const url_Short = rateLimit({
    windowMs: 7 * 24 * 60 * 60 * 1000,
    limit: 5, 
    standardHeaders: 'draft-8', 
    legacyHeaders: false,
    message: "Has alcanzado el límite semanal de URLs acortadas. Por favor, inténtalo de nuevo la próxima semana."
})
