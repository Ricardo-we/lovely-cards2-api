import { AuthMiddleware } from "../../services/middlewares/jwt.middleware";
import BRouter from "../../utils/Base/BRouter";
import CardImagesController from "./controllers/card-images.controller";
import CardMessagesController from "./controllers/card-messages.controller";
import CardsController from "./controllers/cards.controller";

const cardsPath = "/cards" 
const cardMessagesPath = "/card-messages";
const cardImagesPath = "/card-images"; 

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

/**** @CARD_MESSAGES_CONTROLLER AND ROUTER */
const cardImagesController = new CardImagesController({
    globalMiddleware: AuthMiddleware,
    routesCustomPaths: {
        put: ":id",
        getOne: ":id",
        // get: ":cardId"
        destroy: ":card_id/:id"
    }   
});
const cardImagesRouter = BRouter.crudRouter(cardImagesPath, cardImagesController)

export default [router, cardMessagesRouter,cardImagesRouter];
