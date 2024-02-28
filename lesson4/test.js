import fs from "fs";

console.log("ASAD");


async function a() {
    return "A";
}


a().then((a) => a).then((a) => {
    console.log("Intermeddiate AAA");
    return a
}).then((a) => {
    console.log(a);
})



fs.readFile("./test.js", "utf8", (err, data) => {
    setImmediate(()=>{
        console.log("Immediate");
    })

   new Promise((resolve, reject) => {
       resolve("data");
   }).then(res =>{
       console.log(res);
   })

    process.nextTick(()=>{
        console.log("TICK");
    })
});

setTimeout(() => {
    console.log("TYIME");
})
