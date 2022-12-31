export class InvalidCardMessageError extends Error {
    constructor(extraMessage?: string) {
        super();
        this.message = "Invalid CardMessage " + extraMessage;
        this.name = "InvalidCardError"
    }
}