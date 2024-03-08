import {validateAppender, validateFormatter, validateLogLevel} from "./validator.js";

export function configFromEnvs(){
    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const formatter = process.env.LOG_OUTPUT_FORMAT?.toUpperCase();
    const delimiter = process.env.LOG_DELIMITER?.toUpperCase();

    const config = {}
    if (validateLogLevel(logLevel)) {
        config.logLevel = logLevel
    }

    const appenders = parseAndValidateAppenders(process.env.LOG_APPENDERS);
    if (appenders.length > 0) {
        config.appenders = appenders;
    }

    if(validateFormatter(formatter)){
        config.formatter = formatter;
    }

    if(delimiter){
        config.delimiter = delimiter;
    }

    return config;
}

function parseAndValidateAppenders(appenders = ""){
    return appenders.split(",")
        .map(a => a.trim().toUpperCase())
        .filter(validateAppender);
}

export default {configFromEnvs}
