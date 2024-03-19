import Instance from "../helper/Instance.js";

const store = new Map()

export default class UrlRepository extends Instance{
    save(model){
        store.set(model.code, model);
    }

    get(code){
        return store.get(code)
    }

    isExist(code){
        return store.has(code);
    }

    getAndIncrement(code){
        const model = store.get(code);
        model.visits += 1;
        this.save(model);

        return model.url;
    }
}
