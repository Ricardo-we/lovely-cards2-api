import BController, { ControllerConfig } from "../../utils/Base/BController";
import { Helper, HelperCategorie, HelperTranslation } from "./model";
import { Request, Response } from "express";

import { HelperService } from "./services/HelperService";
import { errorResponse } from "../../utils/controller.utils";

export default class HelpersController implements BController {
    private helperService = new HelperService();

    constructor(
        public controllerConfig: ControllerConfig
    ) {

    }

    async post(req: Request, res: Response) {

    }
    async put(req: Request, res: Response) {

    }
    async destroy(req: Request, res: Response) {

    }

    get = async (req: Request, res: Response) => {
        try {
            const { categorie_name = "card_types", language=null } = req.query;
            
            let result
            if(language && language !== "en") await this.helperService.findTranslatedHelpersByCategorieName(categorie_name as string, language as string);
            else result = await this.helperService.findHelpersByCategorieName(categorie_name as string);
            
            return res.json(result);
        } catch (error) {
            return res.json(errorResponse(error))
        }
    }

    async getOne(req: Request, res: Response) {

    }
}