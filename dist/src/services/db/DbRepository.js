"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SqlConnector_1 = __importDefault(require("./SqlConnector"));
const config_1 = __importDefault(require("../../config"));
class DbRepository {
    static getConnection(connectionType) {
        const { dbPort, dbHost, dbName, password, username, connectionUrl } = config_1.default.DB_CONFIG;
        const poolConfig = {
            max: 5,
            min: 0,
            idle: 10 * 1000,
        };
        if (connectionType === "postgres") {
            // return SqlConnector.getConnection({ connectionUrl, pool: poolConfig })
            return SqlConnector_1.default.getConnection({
                dialect: 'postgres',
                host: dbHost,
                dbName,
                password,
                username,
                port: parseInt(dbPort),
                pool: poolConfig
            });
        }
        return new sequelize_1.Sequelize();
    }
}
exports.default = DbRepository;
