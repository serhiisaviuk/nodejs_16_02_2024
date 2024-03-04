import config from "./config/config.js";

export function transformMessageLog(message){
    return message.map(JSON.stringify).join(config.delimiter);
}
