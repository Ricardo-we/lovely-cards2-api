import { DeactivatedUserError, InvalidPasswordError, InvalidUserCodeError, NotFoundUser, UserAlreadyExistsError } from "../../../utils/Errors/User.errors";
import { FullUser, IUser } from "../../../types/User";
import { User, UserCode } from "../model";
import { comparePlainToEncrypted, encryptWord } from "../../../utils/crypt.utils";

import { ComunicatorBase } from "../../../services/communication/ComunicatorBase";
import { EmailComunicatorOptions } from "../../../services/communication/ComunicatorBase";
import { generateJWT } from "../../../services/middlewares/jwt.middleware";

export default class AuthService {

    public static sendUserCode = async (createdUser: IUser, comunicator?: ComunicatorBase) => {
        const userCode = await UserCode.create({ user_id: createdUser.id });
        comunicator?.send({ 
            to: createdUser.email,
            subject: "LovelyCards", 
            body: `Welcome to LovelyCards your code is ${userCode.getDataValue("code")} you have 10 minutes to use it` 
        })

        setTimeout(() => {
            UserCode.destroy({ where: { user_id: createdUser.id } });
        }, 600000);
        
        return userCode;
    }

    public static createUser = async (user: IUser, comunicator?: ComunicatorBase): Promise<IUser> => {
        const userExists = !!(await User.findOne({ where: { username: user.username } }))?.getDataValue("username");
        if (userExists) throw new UserAlreadyExistsError();
        if (!user.password) throw new InvalidPasswordError();
        const createdUser = await User.create({ ...user, password: encryptWord(user.password) });
        await AuthService.sendUserCode(createdUser.toJSON(), comunicator);
        return createdUser.toJSON();
    }

    public static giveCredentials = (user: IUser) => {
        return {
            token: generateJWT(user),
            user: user as IUser
        };
    }

    public static login = async (user: IUser): Promise<FullUser> => {
        const savedUser = await User.findOne({ where: { username: user.username } });
        if (!savedUser) throw new NotFoundUser();
        if (!savedUser.getDataValue("isActive")) throw new DeactivatedUserError();
        const isValidPassword: boolean = comparePlainToEncrypted(user.password as string, savedUser.getDataValue("password"))
        if (!isValidPassword) throw new InvalidPasswordError();
        return AuthService.giveCredentials(savedUser.toJSON());
    }

    public static confirmUserCode = async (user_id: number, user_code: string) => {
        const sequelizeQuery = {where: { user_id, code: user_code }};
        const userCode = await UserCode.findOne(sequelizeQuery);
        if(!userCode) throw new InvalidUserCodeError();
        const user = await User.update({isActive: true},{ returning: true, where: {id: user_id} });
        await UserCode.destroy(sequelizeQuery);
        return user[1][0].toJSON(); 
    }
}