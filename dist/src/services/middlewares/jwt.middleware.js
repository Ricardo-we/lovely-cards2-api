"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = exports.decodeToken = exports.generateJWT = void 0;
const config_1 = __importDefault(require("../../config"));
const controller_utils_1 = require("../../utils/controller.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWT(payload) {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_HASH);
}
exports.generateJWT = generateJWT;
function decodeToken(token) {
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_HASH);
}
exports.decodeToken = decodeToken;
function AuthMiddleware(req, res, next) {
    var _a;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization))
            throw new Error("Not token in headers");
        const decodedToken = decodeToken(req.headers.authorization.split(" ")[1]);
        req.user = decodedToken;
        return next();
    }
    catch (error) {
        return res.json((0, controller_utils_1.errorResponse)(error));
    }
}
exports.AuthMiddleware = AuthMiddleware;
