import fsAsync from "fs/promises";
import fs from "fs";
import path from "path";


// const fileSync = fs.readFileSync('./logger.json', 'utf-8');
// console.log(fileSync);


// fs.readFile('./logger.json', 'utf-8', (err,data)=>{
//     console.log(data);
// })


const filePath = './test.txt';
const normalized = path.normalize(filePath);
try {
    fs.writeFileSync(normalized, "QWEQWEQWqwe");
    fs.appendFileSync(normalized, "\nAPPEND")
} catch (e) {
    console.error(e)
}

const pathes = path.resolve("lesson2", "logger.json");
console.log(pathes);


const buffer = Buffer.alloc(1024);
fs.open(pathes, 'r', (err, fd) => {
    console.log(err, fd);

    fs.read(fd, buffer, 0, buffer.length, 0, (err, num) => {
        if (err) {
            console.error('Помилка при читанні файлу:', err);
            return;
        }
        console.log('Прочитані дані:', buffer.toString('utf8', 0, num));

        // Закриття файлу після завершення читання
        fs.close(fd, (err) => {
            if (err) console.error('Помилка при закритті файлу:', err);
        });
    });
});

(async () => {
    const file = await fsAsync.readFile(pathes, 'utf-8');
    // await fsAsync.appendFile(filePath,"\nASYNC TEST")
    console.log(file);
})();
