import formatMessage from "../formatMessage.js";

function message(date, level, category, message){
    console.log(formatMessage(date, level, category, message));
}


export default message;
