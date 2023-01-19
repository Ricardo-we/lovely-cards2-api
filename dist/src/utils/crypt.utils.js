"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumbers = exports.comparePlainToEncrypted = exports.encryptWord = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function encryptWord(plainText) {
    const salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(plainText, salt);
}
exports.encryptWord = encryptWord;
function comparePlainToEncrypted(plainText, hashedText) {
    return bcrypt_1.default.compareSync(plainText, hashedText);
}
exports.comparePlainToEncrypted = comparePlainToEncrypted;
function getRandomNumbers(size = 4) {
    let randomCode = "";
    for (let i = 0; i <= size; i++)
        randomCode += Math.floor(Math.random() * 10);
    return randomCode.slice(0, size);
}
exports.getRandomNumbers = getRandomNumbers;
