export default class HttpStatusError extends Error {

    constructor(message) {
        super(message);
    }

    httpStatus() {
        throw "non-implemented";
    }
}
