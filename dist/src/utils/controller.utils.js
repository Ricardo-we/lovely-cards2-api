"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
function errorResponse(error) {
    if (!error.name || !error.message)
        return {
            error: "Unkown",
            message: "Unknown reason"
        };
    return {
        error: error.name,
        message: error.message
    };
}
exports.errorResponse = errorResponse;
function successResponse(successMessage) {
    return {
        message: successMessage || "Success",
    };
}
exports.successResponse = successResponse;
