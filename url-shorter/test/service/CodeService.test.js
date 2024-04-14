import {jest} from '@jest/globals';

import CodeService from "../../src/service/CodeService.js";

let service;

const mockRepositoryIsExist = jest.fn();

describe.skip("TEst", () => {

    beforeAll(async () => {

        jest.mock("../../src/repository/UrlRepository.js", () => {
            return {
                isExist: mockRepositoryIsExist
            }
        });

        // const CodeService = (await import( "../../src/service/CodeService.js")).default;


        service = new CodeService();
    });


    it("call generateString few times, when first try generate already existed code", () => {
        mockRepositoryIsExist.mockImplementation(() => {
            console.log("MOCK RUN");
            return false;
        });

        const generateCode = service.generateCode();

        console.log(generateCode);
    });

});
