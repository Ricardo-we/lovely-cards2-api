"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const log_utils_1 = require("../../log.utils");
const index_1 = __importDefault(require("../../../config/index"));
const path_1 = __importDefault(require("path"));
const BASE_APP_PATH = path_1.default.join(__dirname, "..", "..", "..", "app");
function bulkAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Promise.all(index_1.default.BULK_LIST.map((dataBulkAppName) => __awaiter(this, void 0, void 0, function* () {
                const appBulkModule = yield Promise.resolve().then(() => __importStar(require(path_1.default.join(BASE_APP_PATH, dataBulkAppName, "dataBulk"))));
                yield appBulkModule.bulkData();
            })));
            (0, log_utils_1.blueLog)("Action succeeded");
            process.exit(0);
        }
        catch (error) {
            (0, log_utils_1.errLog)("Something went wrong...");
            (0, log_utils_1.errLog)(error);
            process.exit(1);
        }
    });
}
bulkAll();
