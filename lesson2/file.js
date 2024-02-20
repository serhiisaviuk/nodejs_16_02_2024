import fsPromises from "fs/promises";
import fs from "fs";

// const dataFile = fs.readFileSync('./data.json', "utf-8");


// (async () => {
//     const data = await fsPromises.readFile('./data.json', "utf-8");
//     console.log("PROMISE", data);
//
// })();




// fs.readFile('./data.json', "utf-8", (err, data) =>{
//     console.log(data);
// })


// const data = JSON.parse(dataFile);
//
// console.log(typeof data);
// console.log(data.name);


const file = "./test.txt";
fs.writeFileSync(file, "\nsdfsdfsdfsakdg", {flag:"a+"});
fs.appendFileSync(file, "\nAPPENDDDDD");
