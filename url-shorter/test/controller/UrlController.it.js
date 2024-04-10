import request from 'supertest';


describe("qwe", () => {

    let app;

    beforeAll(async ()=>{
        const web = (await import("../../src/webContext.js")).default;
        app = new web();

    })

    it("qwe",async () => {

       await request(app)
           .post("/token")
           .expect(200);
    })
});
