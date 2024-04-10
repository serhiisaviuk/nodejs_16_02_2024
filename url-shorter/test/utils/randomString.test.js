import {generateString} from "../../src/utils/randomString.js";
import * as assert from "assert";

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

describe("randomString Util", () => {

    // beforeAll(() => {
    //     console.log("BEFORE aLL");
    // });
    //
    // afterEach(() => {
    //     console.log("AfterEach");
    // })

    test("should return random string with length 5", () => {
        const GENERATED_LENGTH = 5;

        const result = generateString(GENERATED_LENGTH);

        expect(typeof result).toBe("string");
        expect(result.length).toBe(GENERATED_LENGTH);
        expect(result).not.toBe("");

    });


    it("should return empty string for UNDEFINED length", () => {
        const result = generateString(undefined);

        assert.equal(result, "")
    })

    it("should return empty string for INVALID length", () => {
        const result = generateString("STRING");

        expect(typeof result).toBe("string");
        expect(result).toHaveLength(0);
    })

    it("should return random string which consist only for valid characters", () => {
        const result = generateString(10);

        for (const char of result) {
            expect(characters.includes(char)).toBeTruthy();
        }
    })

});
