import BController, { ControllerConfig } from "../../../utils/Base/BController";
import { Request, Response } from "express";

import CardService from "../services/CardService";
import { CloudinaryUploader } from "../../../services/file-upload/Uploaders/CloudinaryUploader";
import { ICard } from "../../../types/Cards";
import { errorResponse } from "../../../utils/controller.utils";

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
            const card = req.body as ICard
            const music = req?.files[0];
            const newCard = await CardService.createCard(card, req.user, music);
            return res.json(newCard);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async destroy(req: Request, res: Response) {

    }

    async get(req: any, res: Response) {
        return res.json({ Xd: true });
    }

    async getOne(req: Request, res: Response) {
        const { cardId } = req.params;
        return res.json({ cardId })
    }
}