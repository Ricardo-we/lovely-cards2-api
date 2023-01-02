
import BRouter from "../../utils/Base/BRouter";
import AppTranslations from "./controller";

const routeBasePath = "/app-translations" 
const controller = new AppTranslations({ globalRoute:"" });
const router = BRouter.crudRouter(routeBasePath, controller);

export default router;
