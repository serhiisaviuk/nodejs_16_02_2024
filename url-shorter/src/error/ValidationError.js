export default class ValidationError extends HttpStatusError, Error{
    constructor(message, fields) {
        super(message);
        this.fields = fields
    }

    get fields(){
        return this.fields;
    }

    get httpStatus(){
        return 422
    }
}


class HttpStatusError{
    httpStatus(){
        throw "non-implemented";
    }
}
