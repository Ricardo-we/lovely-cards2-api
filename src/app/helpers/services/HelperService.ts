import { Helper, HelperCategorie, HelperTranslation } from "../model"

import DbRepository from "../../../services/db/DbRepository";

export class HelperService {
    private conn = DbRepository.getConnection("postgres");

    constructor() {
    }

    findHelpersByCategorieName = async (categorieName: string) => {
        const helpers = await HelperCategorie.findOne({ 
            where: { name: categorieName }, 
            include: { attributes: ["name", "code","extra",], model: Helper, as: "helpers" } 
        });

        return helpers?.toJSON()?.helpers
    }

    findTranslatedHelpersByCategorieName = async (categorieName: string, language: string) => {
        const helperTableName = Helper.getTableName();
        const helperTranslationTableName = HelperTranslation.getTableName();
        const helperCategorieTableName = HelperCategorie.getTableName();
        
        const query = `
        SELECT ${helperTableName}.extra, ${helperTableName}.code, ${helperTranslationTableName}.name FROM ${helperCategorieTableName} 
        INNER JOIN ${helperTableName} ON ${helperTableName}.helper_categorie_id = ${helperCategorieTableName}.id
        INNER JOIN ${helperTranslationTableName} ON ${helperTranslationTableName}.helper_id = ${helperTableName}.id
        WHERE ${helperCategorieTableName}.name = ? AND ${helperTranslationTableName}.language_id = (SELECT id FROM ${helperTableName} WHERE code = ?)`;

        const result = await this.conn.query({query, values: [categorieName, language]},);
        return result[0];
    }
}