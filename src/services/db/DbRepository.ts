import { Options, Sequelize } from "sequelize"

import SqlConnector from "./SqlConnector"
import appConfig from "../../config";

export type connectionTypes = "postgres" | "mongo";

export default class DbRepository {

    static getConnection(connectionType: connectionTypes): Sequelize{
        const { dbPort, dbHost, dbName, password, username, connectionUrl} = appConfig.DB_CONFIG;
        const poolConfig =  {
            max: 5,
            min: 0,
            idle: 10 * 1000,
          };
        
        if (connectionType === "postgres") {
            // return SqlConnector.getConnection({ connectionUrl, pool: poolConfig })
            try {
                return SqlConnector.getConnection({
                    dialect: 'postgres',
                host: dbHost,
                dbName,
                password,
                username,
                port: parseInt(dbPort),
                pool: poolConfig
            });
                
            } catch (error) {
                return new Sequelize();
            }
        }

        return new Sequelize();
    }
}