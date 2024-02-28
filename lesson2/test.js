function test(){
    console.log("TEST");
}

async function atest(){
    console.log("ATEST");
    return () => {
        console.log("qweqwe");
    }
}

new Promise((res,rej) =>{
    console.log("PRomise");
})
