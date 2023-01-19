"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mkdirSyncSafe = exports.removeFileSyncSafe = exports.writeFileSyncSafe = void 0;
const fs_1 = require("fs");
function writeFileSyncSafe(filePath, content) {
    try {
        (0, fs_1.writeFileSync)(filePath, content);
        return filePath;
    }
    catch (error) {
        return false;
    }
}
exports.writeFileSyncSafe = writeFileSyncSafe;
function removeFileSyncSafe(filePath) {
    try {
        if (!(0, fs_1.existsSync)(filePath))
            return false;
        (0, fs_1.unlinkSync)(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.removeFileSyncSafe = removeFileSyncSafe;
function mkdirSyncSafe(filePath) {
    try {
        (0, fs_1.mkdirSync)(filePath);
        return filePath;
    }
    catch (error) {
        return false;
    }
}
exports.mkdirSyncSafe = mkdirSyncSafe;
