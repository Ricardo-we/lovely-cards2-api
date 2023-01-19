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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_utils_1 = require("../../../utils/controller.utils");
const CardImagesService_1 = __importDefault(require("../services/CardImagesService"));
const CloudinaryUploader_1 = require("../../../services/file-upload/Uploaders/CloudinaryUploader");
class CardImagesController {
    constructor(controllerConfig) {
        this.controllerConfig = controllerConfig;
        this.fileUploader = new CloudinaryUploader_1.CloudinaryUploader();
        this.cardImageService = new CardImagesService_1.default();
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const cardImage = req.body;
                const image = req === null || req === void 0 ? void 0 : req.files[0];
                const newCardImage = yield this.cardImageService.createCardImage(cardImage, user, image);
                return res.json(newCardImage);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.put = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const cardImageId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
                const user = req.user;
                const newImageValue = req.body;
                const fileImage = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b[0];
                const updatedCardImage = yield this.cardImageService.updateCardImage(newImageValue, user, fileImage, parseInt(cardImageId));
                return res.json(updatedCardImage);
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.destroy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cardImageId = req.params.id;
                const cardId = req.params.card_id;
                const user = req.user;
                yield this.cardImageService.destroyCardImage(cardImageId, cardId, user);
                return res.json((0, controller_utils_1.successResponse)());
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
    ;
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({});
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({});
            }
            catch (error) {
                return res.json((0, controller_utils_1.errorResponse)(error));
            }
        });
    }
}
exports.default = CardImagesController;
