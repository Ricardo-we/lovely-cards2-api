import BController, { ControllerConfig } from "../../../utils/Base/BController";
import { Card, CardImage, CardMessage } from "../model";
import { ICard, ICardImage } from "../../../types/Cards";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../../utils/controller.utils";

import { CardImageError } from "../../../utils/Errors/Cards.error";
import CardImagesService from "../services/CardImagesService";
import CardService from "../services/CardService";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { IUser } from "../../../types/User";
import { compareTwoDates } from "../../../utils/date.utils";

export default class CardImagesController implements BController {
    private fileUploader: CloudinaryUploader = new CloudinaryUploader();;
    private cardImageService = new CardImagesService();

    constructor(
        public controllerConfig: ControllerConfig,
    ) {
    }

    post = async (req: Request | any, res: Response) => {
        try {
            const user = req.user as IUser;
            const cardImage = req.body as ICardImage;
            const image = req?.files[0];
            const newCardImage = await this.cardImageService.createCardImage(cardImage, user, image);

            return res.json(newCardImage);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    put = async (req: Request | any, res: Response) => {
        try {
            const cardImageId = req.params?.id;
            const user = req.user as IUser;
            const newImageValue = req.body as ICardImage;
            const fileImage = req?.files?.[0];
            const updatedCardImage = await this.cardImageService.updateCardImage(newImageValue, user, fileImage, parseInt(cardImageId));
            return res.json(updatedCardImage);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    destroy = async (req: Request | any, res: Response) => {
        try {
            const cardImageId = req.params.id;
            const cardId = req.params.card_id;
            const user = req.user as IUser;

            await this.cardImageService.destroyCardImage(cardImageId, cardId, user);
            return res.json(successResponse());
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async get(req: any, res: Response) {
        try {
            return res.json({});
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async getOne(req: Request, res: Response) {
        try {

            return res.json({});
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }
}