import BController, { ControllerConfig } from "../../../utils/Base/BController";
import { Card, CardImage, CardMessage } from "../model";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../../utils/controller.utils";

import CardService from "../services/CardService";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { ICard } from "../../../types/Cards";
import { compareTwoDates } from "../../../utils/date.utils";

export default class CardsController implements BController {
    private fileUploader: CloudinaryUploader;
    constructor(
        public controllerConfig: ControllerConfig,
    ) {
        this.fileUploader = new CloudinaryUploader();
    }

    post = async (req: Request | any, res: Response) => {
        try {
            const card = req.body as ICard
            const music = req?.files.length > 0 ? req?.files[0] : card?.music || null;
            const newCard = await CardService.createCard(card, req.user, music);
            return res.json(newCard);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    put = async (req: Request | any, res: Response) => {
        try {
            const user = req?.user;
            const card = req.body as ICard
            const music = req?.files[0];
            const updatedCard = await CardService.updateCard(card, req.params.cardId, user, music);
            return res.json(updatedCard);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async destroy(req: Request | any, res: Response) {
        try {
            const user = req.user;
            const cardId: number = parseInt(req.params.cardId);
            await CardService.destroyFullCard(cardId, user?.id);
            return res.json(successResponse())
        } catch (error) {
            return res.json(errorResponse(error));
        }
    }

    async get(req: any, res: Response) {
        try {
            const userCards = await Card.findAll({
                where: { user_id: req.user.id },
                order: [["id", "ASC"]]
            });
            return res.json(userCards);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { cardId } = req.params;
            const cardMessages = await CardMessage.findAll({ where: { card_id: cardId } });
            const cardImages = await CardImage.findAll({ where: { card_id: cardId } });
            const card = await Card.findOne({ where: { id: cardId }, });


            const result = {
                ...card?.toJSON(),
                cardContents: [...cardMessages, ...cardImages].sort(
                    (current, prev) =>
                        compareTwoDates(current.getDataValue("createdAt"), prev.getDataValue("createdAt")),
                ).map(item => item.toJSON()),
            };

            return res.json(result);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }
}