// import CodeService from "../url-shorter/src/service/CodeService.js";
import UrlRepository from "../url-shorter/src/repository/UrlRepository.js";
import sinon from "sinon";
import proxyquire from "proxyquire";

describe('Mocha test here', () => {

    let service;

    before(() => {
        // service = new CodeService();

        service = proxyquire("../url-shorter/src/service/CodeService.js", {
            "../url-shorter/src/repository/UrlRepository.js":{
                isExist:(code)=>{
                    console.log("PROXY");
                    return true;
                }
            }
        })

        // const repository = new UrlRepository();
        // sinon.stub(UrlRepository.prototype, "isExist")
    })


    it("generate code string", () => {

        const code = service.generateCode();

        console.log(code);
    })

});
