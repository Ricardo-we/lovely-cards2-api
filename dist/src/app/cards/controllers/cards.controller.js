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
const model_1 = require("../model");
const controller_utils_1 = require("../../../utils/controller.utils");
const CardService_1 = __importDefault(require("../services/CardService"));
const CloudinaryUploader_1 = require("../../../services/file-upload/Uploaders/CloudinaryUploader");
const date_utils_1 = require("../../../utils/date.utils");
class CardsController {
    constructor(controllerConfig) {
        this.controllerConfig = controllerConfig;
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const card = req.body;
                const music = (req === null || req === void 0 ? void 0 : req.files.length) > 0 ? req === null || req === void 0 ? void 0 : req.files[0] : (card === null || card === void 0 ? void 0 : card.music) || null;
                const newCard = yield CardService_1.default.createCard(card, req.user, music);
                return res.json(newCard);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req === null || req === void 0 ? void 0 : req.user;
                const card = req.body;
                const music = req === null || req === void 0 ? void 0 : req.files[0];
                const updatedCard = yield CardService_1.default.updateCard(card, req.params.cardId, user, music);
                return res.json(updatedCard);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.fileUploader = new CloudinaryUploader_1.CloudinaryUploader();
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cardId = parseInt(req.params.cardId);
                yield CardService_1.default.destroyFullCard(cardId, user === null || user === void 0 ? void 0 : user.id);
                return res.json((0, controller_utils_1.successResponse)());
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCards = yield model_1.Card.findAll({
                    where: { user_id: req.user.id },
                    order: [["id", "ASC"]]
                });
                return res.json(userCards);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cardId } = req.params;
                const cardMessages = yield model_1.CardMessage.findAll({ where: { card_id: cardId } });
                const cardImages = yield model_1.CardImage.findAll({ where: { card_id: cardId } });
                const card = yield model_1.Card.findOne({ where: { id: cardId }, });
                const result = Object.assign(Object.assign({}, card === null || card === void 0 ? void 0 : card.toJSON()), { cardContents: [...cardMessages, ...cardImages].sort((current, prev) => (0, date_utils_1.compareTwoDates)(current.getDataValue("createdAt"), prev.getDataValue("createdAt"))).map(item => item.toJSON()) });
                return res.json(result);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
}
exports.default = CardsController;
