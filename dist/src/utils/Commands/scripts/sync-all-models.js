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
const db_utils_1 = require("../../Db/db.utils");
const log_utils_1 = require("../../log.utils");
const config_1 = __importDefault(require("../../../config"));
function syncAllModels() {
    return __awaiter(this, void 0, void 0, function* () {
        const appModels = yield (0, db_utils_1.getAppModels)(config_1.default.apps);
        yield (0, db_utils_1.syncModelList)(appModels, { alter: true, force: false });
        return;
    });
}
syncAllModels()
    .then(() => (0, log_utils_1.safeLogs)("Models sync successfully"))
    .catch(err => {
    (0, log_utils_1.safeErrLog)(err);
})
    .finally(() => {
    (0, log_utils_1.safeLogs)("Sync process completed");
    process.exit(0);
});
