"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class SqlConnector {
    constructor() { }
    static getConnection(connectionConfig) {
        if (connectionConfig.connectionUrl)
            return new sequelize_1.Sequelize(connectionConfig.connectionUrl, Object.assign({}, connectionConfig));
        const sequelize = new sequelize_1.Sequelize((connectionConfig === null || connectionConfig === void 0 ? void 0 : connectionConfig.dbName) || "", (connectionConfig === null || connectionConfig === void 0 ? void 0 : connectionConfig.username) || "", (connectionConfig === null || connectionConfig === void 0 ? void 0 : connectionConfig.password) || "", Object.assign(Object.assign({}, connectionConfig), { port: connectionConfig.port }));
        return sequelize;
    }
    ;
}
exports.default = SqlConnector;
