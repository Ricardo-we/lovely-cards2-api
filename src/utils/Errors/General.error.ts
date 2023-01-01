
export class NotFoundItemError extends Error {
    constructor(item: string) {
        super();
        this.message = `${item} not found or doesnt exists`;
        this.name = "NotFoundItemError"
    }
}
