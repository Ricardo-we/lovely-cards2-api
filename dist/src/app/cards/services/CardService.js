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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../model");
const Cards_error_1 = require("../../../utils/Errors/Cards.error");
const CloudinaryUploader_1 = require("../../../services/file-upload/Uploaders/CloudinaryUploader");
class CardService {
}
exports.default = CardService;
_a = CardService;
CardService.fileUploader = new CloudinaryUploader_1.CloudinaryUploader();
CardService.handleMusicUpload = (music) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CardService.fileUploader.uploadFile({
        path: music.path,
        uploadOptions: { resource_type: "raw" }
    });
});
CardService.validateCardBelongsToUser = (card_id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.id))
        throw new Error("User id is required");
    const card = yield model_1.Card.findOne({ where: { id: card_id, user_id: user === null || user === void 0 ? void 0 : user.id } });
    if (!card)
        throw new Cards_error_1.CardDoesNotBelongToUserError();
    return [!!card, card === null || card === void 0 ? void 0 : card.toJSON()];
});
CardService.createValidCardObject = (user, card, uploadedMusic) => {
    const isUploadedMusic = typeof uploadedMusic === "object";
    const result = Object.assign(Object.assign({}, card), { music_public_id: isUploadedMusic ? uploadedMusic === null || uploadedMusic === void 0 ? void 0 : uploadedMusic.public_id : null, user_id: user === null || user === void 0 ? void 0 : user.id });
    if ((card === null || card === void 0 ? void 0 : card.music) !== null)
        result.music = isUploadedMusic ? uploadedMusic === null || uploadedMusic === void 0 ? void 0 : uploadedMusic.url : card === null || card === void 0 ? void 0 : card.music;
    return result;
};
CardService.safeDeleteMusicFile = (music_id, newCardValue, isUploadableMusic) => __awaiter(void 0, void 0, void 0, function* () {
    if (music_id && (isUploadableMusic || (newCardValue === null || newCardValue === void 0 ? void 0 : newCardValue.music)))
        yield CardService.fileUploader.removeFile(music_id, "raw");
});
CardService.createCard = (card, user, music) => __awaiter(void 0, void 0, void 0, function* () {
    let uploadedMusic;
    const isUploadableMusic = typeof music === "object";
    if (isUploadableMusic)
        uploadedMusic = yield CardService.handleMusicUpload(music);
    if (!card.title || !card)
        throw new Cards_error_1.InvalidCardError();
    const newCard = yield model_1.Card.create(CardService.createValidCardObject(user, card, uploadedMusic));
    return newCard.toJSON();
});
CardService.updateCard = (newCardValue, cardId, user, musicFile) => __awaiter(void 0, void 0, void 0, function* () {
    let uploadedMusic;
    const isUploadableMusic = typeof musicFile === "object";
    const cardFindQueryObj = { where: { id: cardId, user_id: user === null || user === void 0 ? void 0 : user.id } };
    // const oldCard = await Card.findOne({...cardFindQueryObj});
    const [cardBelongsToCurrentUser, oldCard] = yield CardService.validateCardBelongsToUser(cardId, user);
    if (!oldCard)
        throw new Error("Card not found");
    // const oldCardPublicId = oldCard?.getDataValue("music_public_id")
    const oldCardPublicId = oldCard.music_public_id;
    yield CardService.safeDeleteMusicFile(oldCardPublicId, newCardValue, isUploadableMusic);
    if (isUploadableMusic)
        uploadedMusic = yield CardService.handleMusicUpload(musicFile);
    //*** ACCESS RETURNING VALUE BY USING [1][0] */
    const updatedCard = yield model_1.Card.update(_a.createValidCardObject(user, newCardValue, uploadedMusic), Object.assign(Object.assign({}, cardFindQueryObj), { returning: true }));
    return updatedCard[1][0].toJSON();
});
CardService.destroyFullCard = (cardId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cardImages = yield model_1.CardImage.findAll({ where: { card_id: cardId } });
    yield model_1.Card.destroy({
        where: {
            id: cardId,
            user_id: typeof userId === "string" ? parseInt(userId) : userId
        }
    });
    yield Promise.all(cardImages.map((cardImage) => (cardImage === null || cardImage === void 0 ? void 0 : cardImage.getDataValue("image_id"))
        ? _a.fileUploader.removeFile(cardImage === null || cardImage === void 0 ? void 0 : cardImage.getDataValue("image_id"))
        : null));
    return cardImages;
});
