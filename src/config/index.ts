import dotenv from "dotenv"
import path from "path"

dotenv.config();
export default {
    APP_PORT: process.env.port || 8000,
    DB_CONFIG: {
        username: process.env.PSQL_USER || "",
        dbName: process.env.PSQL_DB_NAME || "",
        password: process.env.PSQL_PASSWORD || "",
        dbHost: process.env.PSQL_HOST || "localhost",
        dbPort: process.env.PSQL_PORT || "5432",
        connectionUrl: process.env.PSQL_DB_URL ,
    },
    CLOUDINARY_CONFIG: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        main_folder: "LovelyCards2",
    },
    EMAIL_SENDING_CONFIG: {
        host: process.env.EMAIL_HOST || "smtp.ethereal.email",
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
            user: process.env?.EMAIL_HOST_USER, // generated ethereal user
            pass: process.env?.EMAIL_HOST_PASSWORD, // generated ethereal password
        },
    }
    ,
    HIDE_LOGS: false,
    APP_ROOT: path.join(__dirname, ".."),
    apps: ["users", "cards", "helpers"],
    BULK_LIST: ["helpers"],
    JWT_HASH: process.env.JWT_HASH || ""
}
