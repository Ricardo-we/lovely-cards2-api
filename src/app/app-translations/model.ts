import { DataTypes } from "sequelize";
import DbRepository from "../../services/db/DbRepository";
import { Helper } from "../helpers/model";
import { IdField } from "../../utils/Db/db.fields";
import { isJson } from "../../utils/string.utils";

const conn = DbRepository.getConnection("postgres");

const AppTranslations = conn.define("app_translations", {
    id: IdField(),
    content: {
        type: DataTypes.STRING(5000),
        allowNull: false,
        validate: {
            isJson            
        }
    }
})

export {
    AppTranslations,
}
