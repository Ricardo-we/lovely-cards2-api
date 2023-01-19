"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCardMessageError = void 0;
class InvalidCardMessageError extends Error {
    constructor(extraMessage) {
        super();
        this.message = "Invalid CardMessage " + extraMessage;
        this.name = "InvalidCardError";
    }
}
exports.InvalidCardMessageError = InvalidCardMessageError;
