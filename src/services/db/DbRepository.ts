import { Options, Sequelize } from "sequelize"

import SqlConnector from "./SqlConnector"
import appConfig from "../../config";

export type connectionTypes = "postgres" | "mongo";

export default class DbRepository {

    static getConnection(connectionType: connectionTypes): Sequelize{
        const { dbName, password, username} = appConfig.DB_CONFIG;
        if (connectionType === "postgres") {
            return SqlConnector.getConnection({
                dialect: 'postgres',
                host: "localhost",
                dbName,
                password,
                username,
            });
        }
        return new Sequelize();
    }
}