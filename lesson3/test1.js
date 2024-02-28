
let a;

function execute(cb) {
    process.nextTick(cb)
    // cb();
}
function callback(){
    console.log(a);
}

execute(callback)

a = 10;
