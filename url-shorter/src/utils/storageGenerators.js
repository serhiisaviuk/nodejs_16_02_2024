const store = {};

//0,1,2,3,4...
function generate(sequenceName) {
    const sequence = store[sequenceName];
    if (!sequence) {
        store[sequenceName] = 0;
    }

    return ++store[sequenceName]
}


export {generate}
