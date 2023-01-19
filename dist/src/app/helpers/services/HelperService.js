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
exports.HelperService = void 0;
const model_1 = require("../model");
const DbRepository_1 = __importDefault(require("../../../services/db/DbRepository"));
class HelperService {
    constructor() {
        this.conn = DbRepository_1.default.getConnection("postgres");
        this.findHelpersByCategorieName = (categorieName) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const helpers = yield model_1.HelperCategorie.findOne({
                where: { name: categorieName },
                include: { attributes: ["id", "extra", "code", "name",], model: model_1.Helper, as: "helpers" }
            });
            return (_a = helpers === null || helpers === void 0 ? void 0 : helpers.toJSON()) === null || _a === void 0 ? void 0 : _a.helpers;
        });
        this.findTranslatedHelpersByCategorieName = (categorieName, language) => __awaiter(this, void 0, void 0, function* () {
            const helperTableName = model_1.Helper.getTableName();
            const helperTranslationTableName = model_1.HelperTranslation.getTableName();
            const helperCategorieTableName = model_1.HelperCategorie.getTableName();
            const query = `
        SELECT ${helperTableName}.id,${helperTableName}.extra, ${helperTableName}.code, ${helperTranslationTableName}.name FROM ${helperCategorieTableName} 
        INNER JOIN ${helperTableName} ON ${helperTableName}.helper_categorie_id = ${helperCategorieTableName}.id
        INNER JOIN ${helperTranslationTableName} ON ${helperTranslationTableName}.helper_id = ${helperTableName}.id
        WHERE ${helperCategorieTableName}.name = ? AND ${helperTranslationTableName}.language_id = (SELECT id FROM ${helperTableName} WHERE code = ?)`;
            const result = yield this.conn.query({ query, values: [categorieName, language] });
            return result[0];
        });
    }
}
exports.HelperService = HelperService;
