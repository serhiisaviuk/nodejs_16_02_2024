export function transformMessageLog(message, delimiter = " "){
    return message.map(JSON.stringify).join(delimiter);
}
