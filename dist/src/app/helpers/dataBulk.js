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
exports.bulkData = void 0;
const model_1 = require("./model");
const log_utils_1 = require("../../utils/log.utils");
const helpers_json_1 = __importDefault(require("../../config/data/helpers.json"));
function bulkData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield model_1.HelperCategorie.bulkCreate(helpers_json_1.default.helper_categories);
            yield model_1.Helper.bulkCreate(helpers_json_1.default.helpers);
            yield model_1.HelperTranslation.bulkCreate(helpers_json_1.default.helper_translations);
            (0, log_utils_1.safeLogs)("Helperes created successfully");
        }
        catch (error) {
            (0, log_utils_1.safeErrLog)("Something went wrong");
        }
    });
}
exports.bulkData = bulkData;
