import { Card } from "../model";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { ICard } from "../../../types/Cards";
import { IUser } from "../../../types/User";
import { InvalidCardError } from "../../../utils/Errors/Cards.error";

export default class CardService {
    static fileUploader = new CloudinaryUploader();
    static async findOneCard(card: ICard) {

    }

    static createCard = async (card: ICard, user: IUser, music?: any) => {
        let uploadedMusic
        const isUploadedMusic = typeof music === "object";
        
        if (isUploadedMusic) {
            uploadedMusic = await CardService.fileUploader.uploadFile({
                path: music.path,
                uploadOptions: { resource_type: "raw" }
            });
        }
        if (!card.title || !card) throw new InvalidCardError();
        
        const newCard = await Card.create({
            ...card,
            music_public_id: music && isUploadedMusic ? uploadedMusic?.public_id : null,
            music: music && isUploadedMusic ? uploadedMusic?.url : music,
            user_id: user?.id
        });
        return newCard.toJSON();
    }

    static updateCard = async (updatedCard: ICard, cardId: number) => {

    }

}