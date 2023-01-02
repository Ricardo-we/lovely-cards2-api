import { Helper, HelperCategorie, HelperTranslation } from "./model";
import { safeErrLog, safeLogs } from "../../utils/log.utils";

import helpersJson from "../../config/data/helpers.json";

export async function bulkData() {
    try {
        await HelperCategorie.bulkCreate(helpersJson.helper_categories);
        await Helper.bulkCreate(helpersJson.helpers);
        await HelperTranslation.bulkCreate(helpersJson.helper_translations);
        safeLogs("Helperes created successfully")
    } catch (error) {
        safeErrLog("Something went wrong")
    }
}