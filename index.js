// require("./config/env")

const config_app = {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT
}

const config_db = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
}
console.log(config_app, config_db);
