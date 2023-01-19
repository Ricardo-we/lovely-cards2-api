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
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const controller_utils_1 = require("../../../utils/controller.utils");
const CardMessagesService_1 = require("../services/CardMessagesService");
class CardMessagesController {
    constructor(controllerConfig) {
        this.controllerConfig = controllerConfig;
        this.cardMessageService = new CardMessagesService_1.CardMessagesService();
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cardMessage = req.body;
                const newCardMessage = yield this.cardMessageService.createMessage(cardMessage, user);
                return res.json(newCardMessage);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cardMessageId = parseInt(req.params.id);
                const user = req === null || req === void 0 ? void 0 : req.user;
                const cardMessage = req.body;
                const updatedCard = yield this.cardMessageService.updateMessage(cardMessage, user, cardMessageId);
                return res.json(Object.assign({}, updatedCard));
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.destroy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const card_id = req.params.card_id;
                yield this.cardMessageService.destroyCardMessage(id, card_id, req.user);
                return res.json((0, controller_utils_1.successResponse)());
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { cardId = null } = req.query;
                const cardMessages = yield model_1.Card.findAll({
                    include: { model: model_1.CardMessage, as: "cardMessages", },
                    where: { user_id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id },
                });
                return res.json(cardMessages);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cardMessage = yield model_1.CardMessage.findAll({ where: { id } });
                return res.json(cardMessage);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
}
exports.default = CardMessagesController;
