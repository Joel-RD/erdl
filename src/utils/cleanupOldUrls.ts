import { safeExecute } from "../models/db.js";

setInterval(async () => {
    try {
        const query = "select * from url_shortener WHERE created_at < NOW() - INTERVAL '3 day';"
        const result = await safeExecute(query);

        if (result.rowCount === 0) {
            console.log("No se ah encontrados datos en la limpiesa de cada dia.");
            return
        }

        await safeExecute("DELETE FROM url_shortener WHERE created_at < NOW() - INTERVAL '3 day';");
        console.log("Registros antiguos eliminados correctamente.");
    } catch (error) {
        console.error("Error al eliminar registros antiguos diario", error);
    }
}, 24 * 60 * 60 * 1000);

