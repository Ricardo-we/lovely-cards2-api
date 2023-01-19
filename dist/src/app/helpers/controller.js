"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HelperService_1 = require("./services/HelperService");
const controller_utils_1 = require("../../utils/controller.utils");
class HelpersController {
    constructor(controllerConfig) {
        this.controllerConfig = controllerConfig;
        this.helperService = new HelperService_1.HelperService();
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { categorie_name = "card_types", language = null } = req.query;
                let result;
                if (language && language !== "en")
                    result = yield this.helperService.findTranslatedHelpersByCategorieName(categorie_name, language);
                else
                    result = yield this.helperService.findHelpersByCategorieName(categorie_name);
                return res.json(result);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = HelpersController;
