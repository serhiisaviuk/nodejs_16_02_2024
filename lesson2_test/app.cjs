

(async ()=>{
    let color = await import("./color.mjs");

    console.log(color.default);

    let data = await import("./data.json", {
        assert:{
            type:"json"
        }
    });

    console.log(data.default);
})();
