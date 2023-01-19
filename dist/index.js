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
const file_upload_deps_1 = require("./src/services/file-upload/file-upload-deps");
const index_1 = __importDefault(require("./src/config/index"));
const route_utils_1 = require("./src/utils/route.utils");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
// GLOBAL MIDDLEWARES
(0, file_upload_deps_1.getCloudinaryConfig)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ storage: file_upload_deps_1.MULTER_DISKSTORAGE_CONFIG }).any());
app.use((0, cors_1.default)());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, route_utils_1.appUseRoutes)(app);
            app.listen(index_1.default.APP_PORT, () => {
                console.log(`Listening in http://localhost:${index_1.default.APP_PORT}`);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
main().catch(console.error);
