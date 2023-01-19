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
exports.manyToManyRelationShip = exports.oneToOneRelation = exports.oneToManyRelation = exports.syncModelList = exports.getAppModels = void 0;
const route_utils_1 = require("../route.utils");
const db_fields_1 = require("./db.fields");
const path_1 = __importDefault(require("path"));
function getAppModels(appNameList, basePath = route_utils_1.BASE_APP_PATH) {
    return Promise.all(appNameList.map((appName) => __awaiter(this, void 0, void 0, function* () {
        const appPath = path_1.default.join(basePath, "app", appName);
        const models = (yield Promise.resolve().then(() => __importStar(require(path_1.default.join(appPath, "model")))));
        return Object.values(models);
    })));
}
exports.getAppModels = getAppModels;
function syncModelList(models, syncOptions) {
    return Promise.all(models.map(appModels => {
        return Promise.all(appModels === null || appModels === void 0 ? void 0 : appModels.map((model) => model === null || model === void 0 ? void 0 : model.sync(syncOptions)));
    }));
}
exports.syncModelList = syncModelList;
function oneToManyRelation(parentModel, childModel, options) {
    parentModel.hasMany(childModel, Object.assign(Object.assign({}, options), options.parent));
    childModel.belongsTo(childModel, Object.assign(Object.assign({}, options), options.children));
}
exports.oneToManyRelation = oneToManyRelation;
function oneToOneRelation(parentModel, childModel, options) {
    parentModel.hasOne(childModel, Object.assign(Object.assign({}, options), options.parent));
    childModel.belongsTo(childModel, Object.assign(Object.assign({}, options), options.children));
}
exports.oneToOneRelation = oneToOneRelation;
function manyToManyRelationShip(firstModel, secondModel, joinerTableName, conn, options) {
    const joinerTable = conn.define(joinerTableName, { id: (0, db_fields_1.IdField)() });
    firstModel.belongsToMany(secondModel, { through: joinerTableName });
    secondModel.belongsToMany(firstModel, { through: joinerTableName });
    firstModel.belongsToMany(secondModel, Object.assign({ through: joinerTableName }, options));
    secondModel.belongsToMany(firstModel, Object.assign({ through: joinerTableName }, options));
    return joinerTable;
}
exports.manyToManyRelationShip = manyToManyRelationShip;
