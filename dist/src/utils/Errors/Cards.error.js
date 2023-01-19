"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardImageError = exports.CardDoesNotBelongToUserError = exports.InvalidCardError = void 0;
class InvalidCardError extends Error {
    constructor(extraMessage) {
        super();
        this.message = "Card invalid or incomplete " + (extraMessage ? extraMessage : "");
        this.name = "InvalidCardError";
    }
}
exports.InvalidCardError = InvalidCardError;
class CardDoesNotBelongToUserError extends Error {
    constructor(extraMessage) {
        super();
        this.message = "Card does not belong to current user";
        this.name = "CardDoesNotBelongToUserError";
    }
}
exports.CardDoesNotBelongToUserError = CardDoesNotBelongToUserError;
class CardImageError extends Error {
    constructor(extraMessage) {
        super();
        this.message = "Image is required";
        this.name = "CardImageError";
    }
}
exports.CardImageError = CardImageError;
