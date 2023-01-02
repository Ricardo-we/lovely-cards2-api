
import DbRepository from "../../services/db/DbRepository";
import { IdField } from "../../utils/Db/db.fields";

const conn = DbRepository.getConnection("mssql");

const AppTranslations = conn.define("app_translations", {
    id: IdField()
})

export {
    AppTranslations,
}
