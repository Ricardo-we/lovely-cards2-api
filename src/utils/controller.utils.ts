export function errorResponse(error: Error | any){
    if(!error.name || !error.message) return {
        error: "Unkown",
        message: "Unknown reason"
    }
    return {
        error: error.name,
        message: error.message
    }
}

export function successResponse(successMessage?: string){
    return {
        message: successMessage || "Success",
    }
}