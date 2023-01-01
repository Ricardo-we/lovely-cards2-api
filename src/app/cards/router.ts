import { AuthMiddleware } from "../../services/middlewares/jwt.middleware";
import BRouter from "../../utils/Base/BRouter";
import CardMessagesController from "./controllers/card-messages.controller";
import CardsController from "./controllers/cards.controller";

const cardsPath = "/cards" 
const cardMessagesPath = "/card-messages";

/**** @CARDSCONTROLLER */
const controller = new CardsController({ 
    globalRoute: cardsPath, 
    // globalMiddleware: AuthMiddleware,
    routesCustomPaths: { getOne: ":cardId", put: ":cardId" } ,
    routesMiddlewares: {
        getOne: [],
        post: [AuthMiddleware],
        get: [AuthMiddleware],
        put: [AuthMiddleware],
    }

});
const router = BRouter.crudRouter(cardsPath, controller);

/**** @CARD_MESSAGES_CONTROLLER AND ROUTER */
const cardMessagesController = new CardMessagesController({
    globalMiddleware: AuthMiddleware,
    routesCustomPaths: {
        put: ":id",
        getOne: ":id",
        // get: ":cardId"
        destroy: ":card_id/:id"
    }   
});
const cardMessagesRouter = BRouter.crudRouter(cardMessagesPath, cardMessagesController)

export default [router, cardMessagesRouter];
