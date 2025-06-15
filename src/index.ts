import app from "./app.js"
import {config} from "../src/config/config.js"

const {URL_LOCAl, PORT_SERVER,} = config

app.listen(PORT_SERVER, () => {
    console.log(`Port: ${PORT_SERVER}\nServer runn url: ${URL_LOCAl}`);  
})
