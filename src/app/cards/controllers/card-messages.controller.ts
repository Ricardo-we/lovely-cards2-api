import BController, { ControllerConfig } from "../../../utils/Base/BController";
import { Card, CardImage, CardMessage } from "../model";
import { ICard, ICardMessage } from "../../../types/Cards";
import { Request, Response } from "express";

import { CardMessagesService } from "../services/CardMessagesService";
import CardService from "../services/CardService";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { IUser } from "../../../types/User";
import { compareTwoDates } from "../../../utils/date.utils";
import { errorResponse } from "../../../utils/controller.utils";

export default class CardMessagesController implements BController {
    private cardMessageService: CardMessagesService = new CardMessagesService();

    constructor(
        public controllerConfig: ControllerConfig,
    ) {
    }

    post = async (req: Request | any, res: Response) => {
        try {
            const user = req.user as IUser;
            const cardMessage = req.body as ICardMessage;
            const newCardMessage = await this.cardMessageService.createMessage(cardMessage, user);
            return res.json(newCardMessage);
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

    async destroy(req: Request, res: Response) {

    }

    async get(req: any, res: Response) {
        try {
            const userCards = await Card.findAll({
                where: { user_id: req.user.id },
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