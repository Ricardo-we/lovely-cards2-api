"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryUploader = void 0;
const UploaderBase_1 = __importDefault(require("../UploaderBase"));
const config_1 = __importDefault(require("../../../config"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const file_utils_1 = require("../../../utils/file.utils");
class CloudinaryUploader extends UploaderBase_1.default {
    constructor() {
        super(...arguments);
        this.uploadFile = (file) => __awaiter(this, void 0, void 0, function* () {
            const uploadedFile = yield cloudinary_1.default.v2.uploader.upload(file === null || file === void 0 ? void 0 : file.path, Object.assign(Object.assign({}, file.uploadOptions), { folder: config_1.default.CLOUDINARY_CONFIG.main_folder }));
            (0, file_utils_1.removeFileSyncSafe)(file.path);
            return uploadedFile;
        });
        this.removeFile = (public_id, resource_type) => __awaiter(this, void 0, void 0, function* () {
            return yield cloudinary_1.default.v2.uploader.destroy(public_id, { resource_type });
        });
    }
}
exports.CloudinaryUploader = CloudinaryUploader;
