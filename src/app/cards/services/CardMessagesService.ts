import { Card, CardMessage } from "../model";

import CardService from "./CardService";
import { ICardMessage } from "../../../types/Cards";
import { IUser } from "../../../types/User";
import { InvalidCardError } from "../../../utils/Errors/Cards.error";
import { InvalidCardMessageError } from "../../../utils/Errors/CardMessage.error";
import { NotFoundItemError } from "../../../utils/Errors/General.error";

export class CardMessagesService {
    constructor() {

    }

    createMessage = async (cardMessage: ICardMessage, user?: IUser) => {
        if (!cardMessage?.card_id) throw new InvalidCardMessageError("card_id is not defined or does not exists");
        const [cardBelongsToCurrentUser,] = await CardService.validateCardBelongsToUser(cardMessage.card_id, user as IUser);
        if (!cardBelongsToCurrentUser) throw new InvalidCardError("card does not belong to user");

        const newCardMessage = await CardMessage.create({ ...cardMessage });

        return newCardMessage.toJSON();
    }

    validateCardMessageBelongsToCurrentUserCard = async (card_id?: number, cardMessageId?: number, user?: IUser) => {
        const cardMessage = await Card.findOne({
            where: {
                id: card_id,
                user_id: user?.id
            },
            attributes: [],
            include: {
                model: CardMessage,
                as: "cardMessages",
                where: { id: cardMessageId }
            }
        });
        if (!cardMessage) throw new NotFoundItemError("Card message ");
        return [!!cardMessage, cardMessage?.toJSON()];
    }

    updateMessage = async (cardMessage: ICardMessage, user: IUser, cardMessageId: number) => {
        const [isUserCardMessage] = await this.validateCardMessageBelongsToCurrentUserCard(cardMessage?.card_id, cardMessageId, user);
        if (!isUserCardMessage) throw new Error("Card message doesnt belong to user");
        
        const updatedCardMessage = await CardMessage.update(
            cardMessage, 
            { where: { id: cardMessageId, card_id: cardMessage.card_id }, returning: true }
        )
        
        return updatedCardMessage[1][0]?.toJSON();
    }

    destroyCardMessage = async (cardMessageId: number,card_id: number, user?: IUser) => {
        const [isUserCardMessage] = await this.validateCardMessageBelongsToCurrentUserCard(card_id, cardMessageId, user)
        if(isUserCardMessage) await CardMessage.destroy({ where: { id: cardMessageId } })
    }
}