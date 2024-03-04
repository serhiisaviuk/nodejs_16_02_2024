import net from "net";


let client;
const log = formatter => (date, level, category, message) => {
    const data = formatter(date, level, category, message);
    client.write(data);
}

function init(formatter) {
    client = net.connect({port:config.appenderPort}, ()=>{
        console.log("Connected");
    });

    process.on("exit", ()=>{
        client.exit();
    })


    return {log: log(formatter)}
}

export default init;
