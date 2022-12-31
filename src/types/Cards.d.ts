import { SequleizeBaseModel } from "./BaseModel";

export interface ICard extends SequleizeBaseModel {
    title?: string,
    music?: string
    music_public_id?: string
    card_background: string
    card_background_type: "decorated_image" | "image" | "color"
    user_id?: number;
}

export interface ICardMessage extends SequleizeBaseModel{
    heading?: string;
    content?: string;
    color?: string
    card_id?: number;
}