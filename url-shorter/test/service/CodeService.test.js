import {jest} from '@jest/globals';

let service;

const mockRepositoryIsExist = jest.fn();

describe("TEst", () => {

    beforeAll(async () => {

        jest.mock("../../src/repository/UrlRepository.js", ()=>{
            return {
                getInstance(){
                    console.log("GET INSTANCE");

                    return {
                        isExist: mockRepositoryIsExist
                    }
                }
            }
        })

        const CodeService = (await import( "../../src/service/CodeService.js")).default;

        service = new CodeService();
    });


    it("call generateString few times, when first try generate already existed code", () => {
        mockRepositoryIsExist.mockImplementation(() => {
            console.log("MOCK RUN");
            return true;
        });

        const generateCode = service.generateCode();
        console.log(generateCode);
    });

});
