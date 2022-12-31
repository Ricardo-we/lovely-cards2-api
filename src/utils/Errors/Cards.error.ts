export class InvalidCardError extends Error {
    constructor(extraMessage?: string) {
        super();
        this.message = "Card invalid or incomplete " + (extraMessage?extraMessage : "");
        this.name = "InvalidCardError"
    }
}