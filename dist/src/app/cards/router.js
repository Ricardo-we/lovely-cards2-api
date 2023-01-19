"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_middleware_1 = require("../../services/middlewares/jwt.middleware");
const BRouter_1 = __importDefault(require("../../utils/Base/BRouter"));
const card_images_controller_1 = __importDefault(require("./controllers/card-images.controller"));
const card_messages_controller_1 = __importDefault(require("./controllers/card-messages.controller"));
const cards_controller_1 = __importDefault(require("./controllers/cards.controller"));
const cardsPath = "/cards";
const cardMessagesPath = "/card-messages";
const cardImagesPath = "/card-images";
/**** @CARDSCONTROLLER */
const controller = new cards_controller_1.default({
    globalRoute: cardsPath,
    // globalMiddleware: AuthMiddleware,
    routesCustomPaths: { getOne: ":cardId", put: ":cardId", destroy: ":cardId" },
    routesMiddlewares: {
        getOne: [],
        post: [jwt_middleware_1.AuthMiddleware],
        get: [jwt_middleware_1.AuthMiddleware],
        put: [jwt_middleware_1.AuthMiddleware],
        destroy: [jwt_middleware_1.AuthMiddleware]
    }
});
const router = BRouter_1.default.crudRouter(cardsPath, controller);
/**** @CARD_MESSAGES_CONTROLLER AND ROUTER */
const cardMessagesController = new card_messages_controller_1.default({
    globalMiddleware: jwt_middleware_1.AuthMiddleware,
    routesCustomPaths: {
        put: ":id",
        getOne: ":id",
        // get: ":cardId"
        destroy: ":card_id/:id"
    }
});
const cardMessagesRouter = BRouter_1.default.crudRouter(cardMessagesPath, cardMessagesController);
/**** @CARD_MESSAGES_CONTROLLER AND ROUTER */
const cardImagesController = new card_images_controller_1.default({
    globalMiddleware: jwt_middleware_1.AuthMiddleware,
    routesCustomPaths: {
        put: ":id",
        getOne: ":id",
        // get: ":cardId"
        destroy: ":card_id/:id"
    }
});
const cardImagesRouter = BRouter_1.default.crudRouter(cardImagesPath, cardImagesController);
exports.default = [router, cardMessagesRouter, cardImagesRouter];
