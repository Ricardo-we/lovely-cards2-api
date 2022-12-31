import APP_CONFIG from "../../config";
import cloudinary from "cloudinary";
import multer from "multer";
import path from "path";

export const MULTER_DISKSTORAGE_CONFIG = multer.diskStorage({
	destination: path.join(APP_CONFIG.APP_ROOT, "uploads"),
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const getCloudinaryConfig = () => cloudinary.v2.config(APP_CONFIG.CLOUDINARY_CONFIG);
