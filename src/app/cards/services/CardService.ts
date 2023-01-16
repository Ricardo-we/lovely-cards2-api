import { Card, CardImage } from "../model";
import { CardDoesNotBelongToUserError, InvalidCardError } from "../../../utils/Errors/Cards.error";

import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { ICard } from "../../../types/Cards";
import { IUser } from "../../../types/User";

export default class CardService {
    static fileUploader = new CloudinaryUploader();

    static handleMusicUpload = async (music?: any) => {
        return await CardService.fileUploader.uploadFile({
            path: music.path,
            uploadOptions: { resource_type: "raw" }
        });
    }

    static validateCardBelongsToUser = async (card_id: number, user: IUser): Promise<[boolean, ICard]> => {
        if (!user?.id) throw new Error("User id is required");
        const card = await Card.findOne({ where: { id: card_id, user_id: user?.id } });
        if (!card) throw new CardDoesNotBelongToUserError();
        return [!!card, card?.toJSON() as ICard];
    }

    static createValidCardObject = (user: IUser, card: ICard, uploadedMusic?: any) => {
        const isUploadedMusic = typeof uploadedMusic === "object";

        const result = {
            ...card,
            music_public_id: isUploadedMusic ? uploadedMusic?.public_id : null,
            user_id: user?.id
        }

        if (card?.music !== null) result.music = isUploadedMusic ? uploadedMusic?.url : card?.music

        return result;
    }

    static safeDeleteMusicFile = async (music_id?: string, newCardValue?: ICard, isUploadableMusic?: boolean) => {
        if (music_id && (isUploadableMusic || newCardValue?.music))
            await CardService.fileUploader.removeFile(music_id, "raw");
    }

    static createCard = async (card: ICard, user: IUser, music?: any) => {
        let uploadedMusic
        const isUploadableMusic = typeof music === "object";

        if (isUploadableMusic) uploadedMusic = await CardService.handleMusicUpload(music);
        if (!card.title || !card) throw new InvalidCardError();

        const newCard = await Card.create(CardService.createValidCardObject(user, card, uploadedMusic));
        return newCard.toJSON();
    }

    static updateCard = async (newCardValue: ICard, cardId: number, user: IUser, musicFile?: any) => {
        let uploadedMusic;
        const isUploadableMusic = typeof musicFile === "object";
        const cardFindQueryObj = { where: { id: cardId, user_id: user?.id } };
        // const oldCard = await Card.findOne({...cardFindQueryObj});
        const [cardBelongsToCurrentUser, oldCard] = await CardService.validateCardBelongsToUser(cardId, user);

        if (!oldCard) throw new Error("Card not found");

        // const oldCardPublicId = oldCard?.getDataValue("music_public_id")
        const oldCardPublicId = oldCard.music_public_id;
        await CardService.safeDeleteMusicFile(oldCardPublicId, newCardValue, isUploadableMusic);

        if (isUploadableMusic)
            uploadedMusic = await CardService.handleMusicUpload(musicFile);

        //*** ACCESS RETURNING VALUE BY USING [1][0] */
        const updatedCard = await Card.update(
            this.createValidCardObject(user, newCardValue, uploadedMusic),
            {
                ...cardFindQueryObj,
                returning: true
            }
        );

        return updatedCard[1][0].toJSON();
    }

    static destroyFullCard = async (cardId: number, userId: number | string) => {
        const cardImages = await CardImage.findAll({ where: { card_id: cardId } });
        await Card.destroy({
            where: {
                id: cardId,
                user_id: typeof userId === "string" ? parseInt(userId) : userId
            }
        });
        await Promise.all(
            cardImages.map((cardImage) => cardImage?.getDataValue("image_id") 
                ? this.fileUploader.removeFile(cardImage?.getDataValue("image_id")) 
                : null
            )
        )

        return cardImages;
    }

}