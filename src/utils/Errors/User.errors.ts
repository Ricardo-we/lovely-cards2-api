
export class UserAlreadyExistsError extends Error {
    constructor() {
        super();
        this.message = "Invalid user, username already in use";
        this.name = "UserAlreadyExistsError"
    }
}

export class NotFoundUser extends Error {
    constructor() {
        super();
        this.message = "User not found, invalid username or doesnt exists";
        this.name = "NotFoundUser"
    }
}

export class InvalidPasswordError extends Error {
    constructor() {
        super();
        this.message = "Incorrect password";
        this.name = "InvalidPasswordError"
    }
}

export class InvalidUserCodeError extends Error {
    constructor() {
        super();
        this.message = "Invalid user code";
        this.name = "InvalidUserCodeError"
    }
}


export class DeactivatedUserError extends Error {
    constructor() {
        super();
        this.message = "User is not active";
        this.name = "DeactivatedUserError"
    }
}