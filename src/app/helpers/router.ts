
import BRouter from "../../utils/Base/BRouter";
import Helpers from "./controller";

const routeBasePath = "/helpers" 
const controller = new Helpers({ globalRoute:"" });
const router = BRouter.crudRouter(routeBasePath, controller);

export default router;
