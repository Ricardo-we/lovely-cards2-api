"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeErrLog = exports.safeLogs = exports.errLog = exports.blueLog = void 0;
const config_1 = __importDefault(require("../config"));
const chalk_1 = __importDefault(require("chalk"));
const HIDE_LOGS = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.HIDE_LOGS;
function blueLog(...message) {
    return console.log(chalk_1.default.blueBright(...message));
}
exports.blueLog = blueLog;
function errLog(...message) {
    return console.log(chalk_1.default.redBright(...message));
}
exports.errLog = errLog;
function safeLogs(...message) {
    if (HIDE_LOGS)
        return;
    blueLog(...message);
}
exports.safeLogs = safeLogs;
function safeErrLog(...message) {
    if (HIDE_LOGS)
        return;
    errLog(...message);
}
exports.safeErrLog = safeErrLog;
