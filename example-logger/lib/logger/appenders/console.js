function init(inputStream, formatter) {

    inputStream.pipe(formatter.transformer()).pipe(process.stdout);
}

export default init;
