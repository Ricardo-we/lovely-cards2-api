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
const AuthService_1 = __importDefault(require("./services/AuthService"));
const EmailService_1 = __importDefault(require("../../services/communication/emails/EmailService"));
const controller_utils_1 = require("../../utils/controller.utils");
class UsersController {
    constructor(controllerConfig) {
        this.controllerConfig = controllerConfig;
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const createdUser = yield AuthService_1.default.createUser(user, this.emailService);
                return res.status(203).json({ user_id: createdUser.id });
            }
            catch (error) {
                return res.status(400).json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.confirmCode = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, user_code } = req.body;
                let user = yield AuthService_1.default.confirmUserCode(user_id, user_code);
                user = yield AuthService_1.default.getUserByUserName(user.username);
                return res.status(200).json(AuthService_1.default.giveCredentials(user));
            }
            catch (error) {
                return res.status(400).json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                return res.status(200).json(yield AuthService_1.default.login(user));
            }
            catch (error) {
                return res.status(400).json((0, controller_utils_1.errorResponse)(error));
            }
        });
        this.emailService = new EmailService_1.default();
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = UsersController;
