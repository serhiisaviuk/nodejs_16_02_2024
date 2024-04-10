import cluster from "cluster";
import http from "http";
import os from "os";

const cpusCount = os.availableParallelism();


if(cluster.isMaster){
    console.log("I'm MASTER", process.pid);

    for (let i = 0; i < cpusCount; i++) {
        cluster.fork();
    }

    cluster.on("fork", (worker)=>{
        console.log("Forked id:", worker.id);
        worker.on("message", (data)=>{
            console.log(`Message from ${worker.id}: ${data}`);
        })
    })

}else {
    console.log("I'm worker", process.pid);

    const server = http.createServer((req, res)=>{
        process.send("Request from worker:" + process.pid + " url: " + req.url);
        res.end("I'm worker" + process.pid);
    });
     server.listen(8000);
    // process.exit(0)
}
