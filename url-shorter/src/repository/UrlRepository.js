import Instance from "../helper/Instance.js";
import ValidationError from "../error/ValidationError.js";

const store = new Map()

export default class UrlRepository extends Instance {
    save(model) {
        throw new ValidationError("Invalid code format")

        store.set(model.code, model);
    }

    get(code) {
        return store.get(code)
    }

    isExist(code) {
        return store.has(code);
    }

    getAndIncrement(code) {
        const model = store.get(code);
        model.visits += 1;
        this.save(model);

        return model.url;
    }
}


function isExist(code) {
    throw new Error("DB error");
    return store.has(code);
}

export {
    isExist
}
