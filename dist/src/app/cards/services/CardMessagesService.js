"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMessagesService = void 0;
const model_1 = require("../model");
const CardService_1 = __importDefault(require("./CardService"));
const Cards_error_1 = require("../../../utils/Errors/Cards.error");
const CardMessage_error_1 = require("../../../utils/Errors/CardMessage.error");
const General_error_1 = require("../../../utils/Errors/General.error");
class CardMessagesService {
    constructor() {
        this.createMessage = (cardMessage, user) => __awaiter(this, void 0, void 0, function* () {
            if (!(cardMessage === null || cardMessage === void 0 ? void 0 : cardMessage.card_id))
                throw new CardMessage_error_1.InvalidCardMessageError("card_id is not defined or does not exists");
            const [cardBelongsToCurrentUser,] = yield CardService_1.default.validateCardBelongsToUser(cardMessage.card_id, user);
            if (!cardBelongsToCurrentUser)
                throw new Cards_error_1.InvalidCardError("card does not belong to user");
            const newCardMessage = yield model_1.CardMessage.create(Object.assign({}, cardMessage));
            return newCardMessage.toJSON();
        });
        this.validateCardMessageBelongsToCurrentUserCard = (card_id, cardMessageId, user) => __awaiter(this, void 0, void 0, function* () {
            const cardMessage = yield model_1.Card.findOne({
                where: {
                    id: card_id,
                    user_id: user === null || user === void 0 ? void 0 : user.id
                },
                attributes: [],
                include: {
                    model: model_1.CardMessage,
                    as: "cardMessages",
                    where: { id: cardMessageId }
                }
            });
            if (!cardMessage)
                throw new General_error_1.NotFoundItemError("Card message ");
            return [!!cardMessage, cardMessage === null || cardMessage === void 0 ? void 0 : cardMessage.toJSON()];
        });
        this.updateMessage = (cardMessage, user, cardMessageId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const [isUserCardMessage] = yield this.validateCardMessageBelongsToCurrentUserCard(cardMessage === null || cardMessage === void 0 ? void 0 : cardMessage.card_id, cardMessageId, user);
            if (!isUserCardMessage)
                throw new Error("Card message doesnt belong to user");
            const updatedCardMessage = yield model_1.CardMessage.update(cardMessage, { where: { id: cardMessageId, card_id: cardMessage.card_id }, returning: true });
            return (_a = updatedCardMessage[1][0]) === null || _a === void 0 ? void 0 : _a.toJSON();
        });
        this.destroyCardMessage = (cardMessageId, card_id, user) => __awaiter(this, void 0, void 0, function* () {
            const [isUserCardMessage] = yield this.validateCardMessageBelongsToCurrentUserCard(card_id, cardMessageId, user);
            if (isUserCardMessage)
                yield model_1.CardMessage.destroy({ where: { id: cardMessageId } });
        });
    }
}
exports.CardMessagesService = CardMessagesService;
