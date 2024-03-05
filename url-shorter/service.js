const storage = new Map();

function add(code, payload){
    storage.set(code, payload);
}

function get(code){
    return storage.get(code);
}

export default {add, get}
