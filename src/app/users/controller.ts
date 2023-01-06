import BController, { ControllerConfig } from "../../utils/Base/BController";
import { Request, Response } from "express";

import AuthService from "./services/AuthService";
import EmailService from "../../services/communication/emails/EmailService";
import { IUser } from "../../types/User";
import { User } from "./model";
import { errorResponse } from "../../utils/controller.utils";

export default class UsersController implements BController {
    public emailService: EmailService;

    constructor(
        public controllerConfig: ControllerConfig
    ) {
        this.emailService = new EmailService()
    }

    post = async (req: Request, res: Response) => {
        try {
            const user: IUser = req.body as IUser;
            const createdUser = await AuthService.createUser(user, this.emailService);
            return res.status(203).json({ user_id: createdUser.id });
        } catch (error) {
            return res.json(errorResponse(error));
        }
    }

    confirmCode = async (req: Request, res: Response) => {
        try {
            const { user_id, user_code } = req.body;
            let user = await AuthService.confirmUserCode(user_id, user_code);
            user = await AuthService.getUserByUserName(user.username); 
            return res.status(200).json(AuthService.giveCredentials(user));
        } catch (error) {
            return res.json(errorResponse(error));
        }
    }

    login = async (req: Request | any, res: Response) => {
        try {
            const user: IUser = req.body as IUser;
            return res.status(200).json(await AuthService.login(user));
        } catch (error) {
            return res.json(errorResponse(error));
        }
    }

    async put(req: Request, res: Response) {

    }

    async destroy(req: Request, res: Response) {

    }

    async get(req: Request, res: Response) {

    }

    async getOne(req: Request, res: Response) {

    }
}