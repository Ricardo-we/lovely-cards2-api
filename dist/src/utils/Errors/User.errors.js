"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeactivatedUserError = exports.InvalidUserCodeError = exports.InvalidPasswordError = exports.NotFoundUser = exports.UserAlreadyExistsError = void 0;
class UserAlreadyExistsError extends Error {
    constructor() {
        super();
        this.message = "Invalid user, username already in use";
        this.name = "UserAlreadyExistsError";
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class NotFoundUser extends Error {
    constructor() {
        super();
        this.message = "User not found, invalid username or doesnt exists";
        this.name = "NotFoundUser";
    }
}
exports.NotFoundUser = NotFoundUser;
class InvalidPasswordError extends Error {
    constructor() {
        super();
        this.message = "Incorrect password";
        this.name = "InvalidPasswordError";
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
class InvalidUserCodeError extends Error {
    constructor() {
        super();
        this.message = "Invalid user code";
        this.name = "InvalidUserCodeError";
    }
}
exports.InvalidUserCodeError = InvalidUserCodeError;
class DeactivatedUserError extends Error {
    constructor() {
        super();
        this.message = "User is not active";
        this.name = "DeactivatedUserError";
    }
}
exports.DeactivatedUserError = DeactivatedUserError;
