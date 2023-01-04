import { safeErrLog, safeLogs } from "../../utils/log.utils";

import { AppTranslations } from "./model";
import helpersJson from "../../config/data/helpers.json";

export async function bulkData() {
    try {
        // await AppTranslations.bulkCreate()
        safeLogs("Helpers created successfully")
    } catch (error) {
        safeErrLog("Something went wrong")
    }
}