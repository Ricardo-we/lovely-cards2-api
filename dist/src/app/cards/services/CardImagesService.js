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
const CardService_1 = __importDefault(require("./CardService"));
const CloudinaryUploader_1 = require("../../../services/file-upload/Uploaders/CloudinaryUploader");
const CardMessage_error_1 = require("../../../utils/Errors/CardMessage.error");
const General_error_1 = require("../../../utils/Errors/General.error");
class CardImagesService {
    constructor() {
        this.fileUploader = new CloudinaryUploader_1.CloudinaryUploader();
        this.createValidCardImageObject = (cardImage, uploadedFile) => {
            return Object.assign(Object.assign({}, cardImage), { image_url: uploadedFile ? uploadedFile.url : cardImage.image_url, image_id: uploadedFile ? uploadedFile.public_id : null });
        };
        this.validateCardImageBelongsToUser = (cardImage, user) => __awaiter(this, void 0, void 0, function* () {
            if (!cardImage.card_id)
                throw new CardMessage_error_1.InvalidCardMessageError("Card id is required");
            yield CardService_1.default.validateCardBelongsToUser(cardImage.card_id, user);
        });
        this.destroyCardImageFile = (public_id) => __awaiter(this, void 0, void 0, function* () {
            yield this.fileUploader.removeFile(public_id);
        });
        this.destroyCardImage = (cardImageId, card_id, user) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            yield CardService_1.default.validateCardBelongsToUser(card_id, user);
            const oldCardImage = (_a = (yield model_1.CardImage.findOne({ where: { card_id, id: cardImageId } }))) === null || _a === void 0 ? void 0 : _a.toJSON();
            if (oldCardImage === null || oldCardImage === void 0 ? void 0 : oldCardImage.image_id)
                yield this.destroyCardImageFile(oldCardImage === null || oldCardImage === void 0 ? void 0 : oldCardImage.image_id);
            yield model_1.CardImage.destroy({ where: { card_id, id: cardImageId } });
        });
        this.createCardImage = (cardImage, user, imageFile) => __awaiter(this, void 0, void 0, function* () {
            yield this.validateCardImageBelongsToUser(cardImage, user);
            let uploadedFile = null;
            if (typeof imageFile === "object")
                uploadedFile = yield this.fileUploader.uploadFile(imageFile);
            const newCardImage = yield model_1.CardImage.create(this.createValidCardImageObject(cardImage, uploadedFile));
            return newCardImage;
        });
        this.updateCardImage = (cardImage, user, imageFile, cardImageId) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const oldCardImage = (_b = (yield model_1.CardImage.findOne({ where: { id: cardImageId, card_id: cardImage.card_id } }))) === null || _b === void 0 ? void 0 : _b.toJSON();
            const isNewImage = oldCardImage.image_url !== cardImage.image_url || typeof imageFile !== "undefined";
            if (!oldCardImage)
                throw new General_error_1.NotFoundItemError("Card image not found");
            if (!isNewImage)
                return oldCardImage;
            yield this.validateCardImageBelongsToUser(cardImage, user);
            let uploadedFile = null;
            if (oldCardImage.image_id && isNewImage)
                yield this.fileUploader.removeFile(oldCardImage.image_id);
            if (typeof imageFile === "object")
                uploadedFile = yield this.fileUploader.uploadFile(imageFile);
            const result = (yield model_1.CardImage.update(this.createValidCardImageObject(cardImage, uploadedFile), {
                where: { id: cardImageId },
                returning: true,
            }))[1][0];
            return result === null || result === void 0 ? void 0 : result.toJSON();
        });
    }
}
exports.default = CardImagesService;
