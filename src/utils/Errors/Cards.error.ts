export class InvalidCardError extends Error {
    constructor(extraMessage?: string) {
        super();
        this.message = "Card invalid or incomplete " + (extraMessage?extraMessage : "");
        this.name = "InvalidCardError"
    }
}

export class CardDoesNotBelongToUserError extends Error {
    constructor(extraMessage?: string) {
        super();
        this.message = "Card does not belong to current user";
        this.name = "CardDoesNotBelongToUserError"
    }
}

export class CardImageError extends Error {
    constructor(extraMessage?: string) {
        super();
        this.message = "Image is required";
        this.name = "CardImageError"
    }
}