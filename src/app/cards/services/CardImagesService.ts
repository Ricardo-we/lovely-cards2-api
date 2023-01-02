import { CardImage } from "../model";
import CardService from "./CardService";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { ICardImage } from "../../../types/Cards";
import { IUser } from "../../../types/User";
import { InvalidCardMessageError } from "../../../utils/Errors/CardMessage.error";
import { NotFoundItemError } from "../../../utils/Errors/General.error";
import { UploadApiResponse } from "cloudinary";

export default class CardImagesService {
    private fileUploader = new CloudinaryUploader();

    constructor() {

    }

    createValidCardImageObject = (cardImage: ICardImage, uploadedFile?: any) => {
        return {
            ...cardImage,
            image_url: uploadedFile ? uploadedFile.url : cardImage.image_url,
            image_id: uploadedFile ? uploadedFile.public_id : null
        }
    }

    validateCardImageBelongsToUser = async (cardImage: ICardImage, user: IUser) => {
        if (!cardImage.card_id) throw new InvalidCardMessageError("Card id is required");
        await CardService.validateCardBelongsToUser(cardImage.card_id, user);
    }

    destroyCardImageFile = async (public_id: string) => {
        await this.fileUploader.removeFile(public_id);
    };

    destroyCardImage = async (cardImageId: number | string, card_id: number, user: IUser) => {
        await CardService.validateCardBelongsToUser(card_id, user);
        const oldCardImage = (await CardImage.findOne({ where: { card_id, id: cardImageId } }))?.toJSON();
        if (oldCardImage?.image_id) await this.destroyCardImageFile(oldCardImage?.image_id)
        await CardImage.destroy({ where: { card_id, id: cardImageId } });
    }

    createCardImage = async (cardImage: ICardImage, user: IUser, imageFile?: any) => {
        await this.validateCardImageBelongsToUser(cardImage, user);
        let uploadedFile: UploadApiResponse | null = null;
        if (typeof imageFile === "object") uploadedFile = await this.fileUploader.uploadFile(imageFile);

        const newCardImage = await CardImage.create(
            this.createValidCardImageObject(cardImage, uploadedFile)
        )
        return newCardImage
    }

    updateCardImage = async (cardImage: ICardImage, user: IUser, imageFile?: any, cardImageId?: number | string) => {
        const oldCardImage = (await CardImage.findOne({ where: { id: cardImageId, card_id: cardImage.card_id } }))?.toJSON();
        if(!oldCardImage) throw new NotFoundItemError("Card image not found");
        await this.validateCardImageBelongsToUser(cardImage, user);
        let uploadedFile: UploadApiResponse | null = null;
        if (oldCardImage.image_id) await this.fileUploader.removeFile(oldCardImage.image_id);
        if (typeof imageFile === "object") uploadedFile = await this.fileUploader.uploadFile(imageFile);

        const result = (await CardImage.update(
            this.createValidCardImageObject(cardImage, uploadedFile),
            {
                where: { id: cardImageId },
                returning: true,
            }
        ))[1][0];
        
        return result.toJSON();
    }

}