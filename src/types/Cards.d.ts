export interface ICard {
    id?: number;
    title?: string,
    music?: string
    card_background: string
    card_background_type: "decorated_image" | "image" | "color"
    user_id?: number;
}