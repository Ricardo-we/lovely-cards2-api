import { DataTypes } from "sequelize";
import DbRepository from "../../services/db/DbRepository";
import { IdField } from "../../utils/Db/db.fields";
import { oneToManyRelation } from "../../utils/Db/db.utils";

const conn = DbRepository.getConnection("postgres");

const HelperCategorie = conn.define("helper_categorie", {
    id: IdField(),
    name:{ 
        type: DataTypes.STRING(255),
        allowNull: false, 
        unique: true
    }
});

const Helper = conn.define("helper", {
    id: IdField(),
    code: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    extra: {
        type: DataTypes.STRING(1000),
        allowNull: true
    }
})

const HelperTranslation = conn.define("helper_translation", {
    id: IdField(),
    name: {
        type: DataTypes.STRING(500),
        allowNull: false
    }
});


oneToManyRelation(HelperCategorie, Helper, { as: "helpers", foreignKey: { allowNull: true, name: "helper_categorie_id", } })
oneToManyRelation(Helper, HelperTranslation, { as: "helperTranslation", foreignKey: { allowNull: false, name: "helper_id", } });
oneToManyRelation(Helper, HelperTranslation, { as: "helperLanguage", foreignKey: { allowNull: false, name: "language_id" } });

export {
    HelperCategorie,
    Helper,
    HelperTranslation
}
