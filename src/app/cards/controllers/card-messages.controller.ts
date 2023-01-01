import BController, { ControllerConfig } from "../../../utils/Base/BController";
import { Card, CardImage, CardMessage } from "../model";
import { ICard, ICardMessage } from "../../../types/Cards";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../../utils/controller.utils";

import { CardMessagesService } from "../services/CardMessagesService";
import CardService from "../services/CardService";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { IUser } from "../../../types/User";
import { Op } from "sequelize";
import { compareTwoDates } from "../../../utils/date.utils";

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
            const cardMessageId = parseInt(req.params.id);
            const user = req?.user;
            const cardMessage = req.body as ICardMessage
            const updatedCard = await this.cardMessageService.updateMessage(cardMessage, user, cardMessageId);
            return res.json({ ...updatedCard });
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    destroy = async (req: Request | any, res: Response) => {
        try {
            const id = req.params.id;
            const card_id = req.params.card_id;
            await this.cardMessageService.destroyCardMessage(id, card_id, req.user as IUser);
            return res.json(successResponse());
        } catch (error) {   
            return res.json(errorResponse(error))
        }
    }

    get = async (req: Request | any, res: Response) => {
        try {
            const { cardId = null } = req.query;
            const cardMessages = await Card.findAll({
                include: { model: CardMessage, as: "cardMessages", },
                where: { user_id: req?.user?.id },
            })
            return res.json(cardMessages);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cardMessage = await CardMessage.findAll({ where: { id } });
            return res.json(cardMessage);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }
}