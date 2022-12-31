import { CardMessage } from "../model";
import CardService from "./CardService";
import { ICardMessage } from "../../../types/Cards";
import { IUser } from "../../../types/User";
import { InvalidCardError } from "../../../utils/Errors/Cards.error";
import { InvalidCardMessageError } from "../../../utils/Errors/CardMessage.error";

export class CardMessagesService {
    constructor(){
        
    }

    createMessage = async (cardMessage: ICardMessage, user?: IUser) => { 
        if(!cardMessage?.card_id) throw new InvalidCardMessageError("card_id is not defined or does not exists");     
        const [cardBelongsToCurrentUser,] = await CardService.validateCardBelongsToUser(cardMessage.card_id, user as IUser);
        if(!cardBelongsToCurrentUser) throw new InvalidCardError("card does not belong to user");

        const newCardMessage = await CardMessage.create({ ...cardMessage });

        return newCardMessage.toJSON();
    }
}