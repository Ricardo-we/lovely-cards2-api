"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundItemError = void 0;
class NotFoundItemError extends Error {
    constructor(item) {
        super();
        this.message = `${item} not found or doesnt exists`;
        this.name = "NotFoundItemError";
    }
}
exports.NotFoundItemError = NotFoundItemError;
