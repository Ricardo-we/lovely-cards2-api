"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTranslations = void 0;
const sequelize_1 = require("sequelize");
const DbRepository_1 = __importDefault(require("../../services/db/DbRepository"));
const db_fields_1 = require("../../utils/Db/db.fields");
const string_utils_1 = require("../../utils/string.utils");
const conn = DbRepository_1.default.getConnection("postgres");
const AppTranslations = conn.define("app_translations", {
    id: (0, db_fields_1.IdField)(),
    content: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false,
        validate: {
            isJson: string_utils_1.isJson
        }
    }
});
exports.AppTranslations = AppTranslations;
