import {Transform} from "stream"

function formatMessage(date, level, category, message) {
    return `Date: ${date}, category:${category}, level:${level}, message:${message}`;
}

export default formatMessage;

export function transformer() {
    return new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            let response = "";

            Object.entries(chunk).forEach(([key, value], index, array) => {
                response += `${key}: ${value}`

                if (index < array.length - 1) {
                    response += ",";
                }
            });

            response += "\n";


            callback(null, response);
        }
    })
}
