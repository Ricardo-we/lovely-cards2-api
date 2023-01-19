"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperTranslation = exports.Helper = exports.HelperCategorie = void 0;
const sequelize_1 = require("sequelize");
const DbRepository_1 = __importDefault(require("../../services/db/DbRepository"));
const db_fields_1 = require("../../utils/Db/db.fields");
const db_utils_1 = require("../../utils/Db/db.utils");
const conn = DbRepository_1.default.getConnection("postgres");
const HelperCategorie = conn.define("helper_categorie", {
    id: (0, db_fields_1.IdField)(),
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true
    }
});
exports.HelperCategorie = HelperCategorie;
const Helper = conn.define("helper", {
    id: (0, db_fields_1.IdField)(),
    code: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    extra: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    }
});
exports.Helper = Helper;
const HelperTranslation = conn.define("helper_translation", {
    id: (0, db_fields_1.IdField)(),
    name: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
});
exports.HelperTranslation = HelperTranslation;
(0, db_utils_1.oneToManyRelation)(HelperCategorie, Helper, { as: "helpers", foreignKey: { allowNull: true, name: "helper_categorie_id", } });
(0, db_utils_1.oneToManyRelation)(Helper, HelperTranslation, { as: "helperTranslation", foreignKey: { allowNull: false, name: "helper_id", } });
(0, db_utils_1.oneToManyRelation)(Helper, HelperTranslation, { as: "helperLanguage", foreignKey: { allowNull: false, name: "language_id" } });
