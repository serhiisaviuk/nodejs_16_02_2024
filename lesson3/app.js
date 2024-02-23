console.log('Message no. 1: Sync');
setTimeout(function () {
    console.log('Message no. 2: setTimeout');
}, 0);

process.nextTick(() => {
    console.log('Tick 4');
});

setImmediate(() => {
    console.log('Immediate 2');
});
var promise = new Promise(function (resolve, reject) {
    console.log("qwe");
    resolve();
});

promise.then(function (resolve) {
    console.log('Message no. 6: 1st Promise');
    process.nextTick(() => {
        console.log('Tick 5');
    });
})
    .then(function (resolve) {
        console.log('Message no. 8: 2nd Promise');
    });

console.log('Message no. 9: Sync');
