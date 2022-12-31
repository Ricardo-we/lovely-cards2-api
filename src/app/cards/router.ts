import { AuthMiddleware } from "../../services/middlewares/jwt.middleware";
import BRouter from "../../utils/Base/BRouter";
import CardsController from "./controllers/cards.controller";

const routeBasePath = "/cards" 
const controller = new CardsController({ 
    globalRoute: routeBasePath, 
    // globalMiddleware: AuthMiddleware,
    routesCustomPaths: { getOne: ":cardId" } ,
    routesMiddlewares: {
        getOne: [],
        post: [AuthMiddleware],
        get: [AuthMiddleware],
    }

});
const router = BRouter.crudRouter(routeBasePath, controller);

export default [router];
