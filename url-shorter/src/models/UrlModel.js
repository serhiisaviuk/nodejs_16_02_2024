class UrlModel{
    code;
    name;
    url;
    visits;
    created_time;
    userId;

    static createFromRequest({url, name}){
        const model = new this();
        model.url = url;
        model.name = name;
        model.visits = 0;
        model.created_time = Date.now();

        return model;
    }
}
