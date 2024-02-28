let a = "qwe";
console.log(a);

async function test(){
    return "TEST";
}


setTimeout(()=>{
    console.log("TImeout 1");
}, 50)


setTimeout(()=>{
    console.log("TImeout 2");
}, 50)


setTimeout(() => {console.log('hi')}, 2000)
setTimeout(() => {console.log('hi')}, 1000)

const activeHandles = process._getActiveHandles();
// activeHandles.forEach( (stacks) =>
//     stacks.forEach(console.log.bind(console))
// );
// ['setTimeout file.js:2']
// ['setTimeout file.js:1']

const delay = (ms) => {
    const start = Date.now();
    while (Date.now() - start < ms) {}
};

// Simulate a time-consuming operation with delay
delay(50000);

console.log(await test());
