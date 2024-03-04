import * as stream from "stream";


var a = new stream.PassThrough({
    objectMode: true
})
a.write("your string");
a.write(JSON.stringify({
    a:"qwe",
    b:"test"
}))
a.write("\n")
a.write(new Number(100))
a.end()


// const s = new stream.Readable();
// s._read(10)
// s.push('beep')    // the string you want

a.pipe(process.stdout)
