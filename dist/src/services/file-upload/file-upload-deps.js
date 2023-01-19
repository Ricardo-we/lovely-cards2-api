"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloudinaryConfig = exports.MULTER_DISKSTORAGE_CONFIG = void 0;
const config_1 = __importDefault(require("../../config"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.MULTER_DISKSTORAGE_CONFIG = multer_1.default.diskStorage({
    destination: path_1.default.join(config_1.default.APP_ROOT, "uploads"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const getCloudinaryConfig = () => cloudinary_1.default.v2.config(config_1.default.CLOUDINARY_CONFIG);
exports.getCloudinaryConfig = getCloudinaryConfig;
