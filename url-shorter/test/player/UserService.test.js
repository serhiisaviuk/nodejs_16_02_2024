import {jest} from '@jest/globals';

describe('UserService create', () => {

    const mockCreate = jest.fn();

    let service;
    beforeAll(async () => {
        jest.unstable_mockModule("../../src/player/UserRepository.js", () => {
            return {
                default: class {
                    create = mockCreate
                }
            }
        });

        const UserService = (await import("../../src/player/UserService.js")).default;
        console.log(UserService);
        service = new UserService();
    })

    it("create", () => {
        mockCreate.mockImplementation(()=>{
            console.log("MOCK CALLED");
        })

        const result = service.create("Class");

        expect(mockCreate).toHaveBeenCalled();
    })
});
