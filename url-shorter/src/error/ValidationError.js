import HttpStatusError from "./HttpStatusError.js";

export default class ValidationError extends HttpStatusError {
    constructor(message, field) {
        super(message);
        this.field = field
    }

    get httpStatus() {
        return 422
    }
}
