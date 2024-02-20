const fruit = require("./fruit.cjs");
const data = require('./data.json');

console.log(fruit);
console.log(data);


(async () => {
    const data = await import("./data.json", {
        assert: {
            type: "json"
        }
    });
    const color = data;
    console.log(color);
})();
