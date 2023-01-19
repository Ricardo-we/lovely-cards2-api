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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const User_errors_1 = require("../../../utils/Errors/User.errors");
const model_1 = require("../model");
const crypt_utils_1 = require("../../../utils/crypt.utils");
const model_2 = require("../../helpers/model");
const jwt_middleware_1 = require("../../../services/middlewares/jwt.middleware");
class AuthService {
}
exports.default = AuthService;
_a = AuthService;
AuthService.sendUserCode = (createdUser, comunicator) => __awaiter(void 0, void 0, void 0, function* () {
    const userCode = yield model_1.UserCode.create({ user_id: createdUser.id, code: (0, crypt_utils_1.getRandomNumbers)() });
    comunicator === null || comunicator === void 0 ? void 0 : comunicator.send({
        to: createdUser.email,
        subject: "LovelyCards",
        body: `Welcome to LovelyCards your code is ${userCode.getDataValue("code")} you have 10 minutes to use it`
    });
    setTimeout(() => {
        model_1.UserCode.destroy({ where: { user_id: createdUser.id } });
    }, 600000);
    return userCode;
});
AuthService.createUser = (user, comunicator) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userExists = !!((_b = (yield model_1.User.findOne({ where: { username: user.username } }))) === null || _b === void 0 ? void 0 : _b.getDataValue("username"));
    if (userExists)
        throw new User_errors_1.UserAlreadyExistsError();
    if (!user.password)
        throw new User_errors_1.InvalidPasswordError();
    const createdUser = yield model_1.User.create(Object.assign(Object.assign({}, user), { password: (0, crypt_utils_1.encryptWord)(user.password) }));
    yield AuthService.sendUserCode(createdUser.toJSON(), comunicator);
    return createdUser.toJSON();
});
AuthService.giveCredentials = (user) => {
    return {
        token: (0, jwt_middleware_1.generateJWT)(user),
        user: user
    };
};
AuthService.getUserByUserName = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.User.findOne({
        where: { username: username },
    });
    const language = yield model_2.Helper.findOne({ where: { id: user === null || user === void 0 ? void 0 : user.getDataValue("language_id") } });
    return Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toJSON()), { language: language === null || language === void 0 ? void 0 : language.toJSON() });
});
AuthService.login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const savedUser = yield _a.getUserByUserName(user.username);
    if (!savedUser)
        throw new User_errors_1.NotFoundUser();
    if (!savedUser.isActive)
        throw new User_errors_1.DeactivatedUserError();
    const isValidPassword = (0, crypt_utils_1.comparePlainToEncrypted)(user.password, savedUser.password);
    if (!isValidPassword)
        throw new User_errors_1.InvalidPasswordError();
    return AuthService.giveCredentials(savedUser);
});
AuthService.confirmUserCode = (user_id, user_code) => __awaiter(void 0, void 0, void 0, function* () {
    const sequelizeQuery = { where: { user_id, code: user_code } };
    const userCode = yield model_1.UserCode.findOne(sequelizeQuery);
    if (!userCode)
        throw new User_errors_1.InvalidUserCodeError();
    const user = yield model_1.User.update({ isActive: true }, { returning: true, where: { id: user_id } });
    yield model_1.UserCode.destroy(sequelizeQuery);
    return user[1][0].toJSON();
});
