"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.default = {
    APP_PORT: process.env.port || 8000,
    DB_CONFIG: {
        username: process.env.PSQL_USER || "",
        dbName: process.env.PSQL_DB_NAME || "",
        password: process.env.PSQL_PASSWORD || "",
        dbHost: process.env.PSQL_HOST || "localhost",
        dbPort: process.env.PSQL_PORT || "5432",
        connectionUrl: process.env.PSQL_DB_URL,
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
            user: (_a = process.env) === null || _a === void 0 ? void 0 : _a.EMAIL_HOST_USER,
            pass: (_b = process.env) === null || _b === void 0 ? void 0 : _b.EMAIL_HOST_PASSWORD, // generated ethereal password
        },
    },
    HIDE_LOGS: false,
    APP_ROOT: path_1.default.join(__dirname, ".."),
    apps: ["users", "cards", "helpers"],
    BULK_LIST: ["helpers"],
    JWT_HASH: process.env.JWT_HASH || ""
};
