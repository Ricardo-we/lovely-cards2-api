import { Options, Sequelize } from "sequelize"

import ConnectorBase from "./ConnectorBase"

export interface SqlConnectorConfig extends Options {
    dbName?: string;
    username?: string;
    password?: string;
    connectionUrl?: string;
}

export default class SqlConnector implements ConnectorBase {
    constructor() { }

    static getConnection(connectionConfig: SqlConnectorConfig): Sequelize {
        if(connectionConfig.connectionUrl) return new Sequelize(connectionConfig.connectionUrl, {...connectionConfig});
        const sequelize = new Sequelize(
            connectionConfig?.dbName || "",
            connectionConfig?.username || "",
            connectionConfig?.password || "",
            {
                ...connectionConfig,
                port: connectionConfig.port,
                
            }
        );
        return sequelize;
    };

}