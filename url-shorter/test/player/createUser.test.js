import {jest} from '@jest/globals';

// https://github.com/jestjs/jest/issues/10025

const mockDeleteU = jest.fn()

jest.unstable_mockModule("../../src/player/userDb.js", () => {
    return {
        deleteU: mockDeleteU
    }
});


let userDB;
let createUser;
beforeAll(async () => {
    userDB = await import("../../src/player/userDb.js");
    createUser = await import("../../src/player/createUser.js");
})

test("delete user", () => {
    mockDeleteU.mockImplementation(() => ("Mock"))

    const result = createUser.deleteUser("TEST");

    expect(userDB.deleteU()).toBe("Mock")

    expect(mockDeleteU).toHaveBeenCalled()
})


