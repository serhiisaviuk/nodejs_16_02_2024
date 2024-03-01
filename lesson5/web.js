import * as http from "http";

const server = http.createServer((req, res)=>{
    const {url, method, headers} = req;

    req.pipe(res);




    // console.log({url, method, headers});

    // const body = []

    // req.on("data", chunk => {
    //     body.push(chunk)
    //     console.log(chunk.toString("utf8"));
    // }).on("end", ()=>{
    //     res.end(Buffer.concat(body));
    // })

    // if(method === "GET" && url === "/logs"){
    //     res.write(JSON.stringify({date:Date.now(), category:"my.js"}))
    //     res.statusCode = 200;
    // }else{
    //     res.statusCode = 404;
    // }
    // res.end();


});


server.listen(8080, ()=>{
    console.log("Server Started");
})
