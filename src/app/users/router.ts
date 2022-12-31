import BRouter from "../../utils/Base/BRouter";
import Users from "./controller";

const routeBasePath = "/users" 
const controller = new Users({ globalRoute:"" });
const router = BRouter.crudRouter(routeBasePath, controller);
router.post(`${routeBasePath}/login`, controller.login);
router.post(`${routeBasePath}/confirmation`, controller.confirmCode);

export default router;
