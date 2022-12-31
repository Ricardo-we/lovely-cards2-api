export class InvalidCardError extends Error {
    constructor() {
        super();
        this.message = "Card invalid or incomplete";
        this.name = "InvalidCardError"
    }
}