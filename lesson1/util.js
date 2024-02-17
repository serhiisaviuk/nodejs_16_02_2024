const cache = new Map();

function add(a, b) {

    return a + b;
}

function minus(a, b) {
    return a - b;
}

function multiple(group, a, b) {
    let g = cache.get(group);
    if (g) {
        console.log(`Exist in cache, group ${group}, value: ${g}`);
        return g;
    }

    let res = a * b;
    cache.set(group, res);
    console.log(`NOT Exist in cache, group ${group}, value: ${res}`);
    return res;
}

const HOSTNAME = "http://127.0.0.1"

module.exports = {
    add,
    minus,
    multiple,
    HOSTNAME
}
