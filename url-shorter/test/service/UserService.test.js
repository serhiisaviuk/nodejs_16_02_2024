import {jest} from "@jest/globals";
import ValidationError from "../../src/error/ValidationError.js";

const EMAIL = "qwe@qwe.com";
const PASSWORD = "p@sVVorD";

describe("UserService tests", () => {

    let service;

    const hashMock = jest.fn(i => i);
    const compareMock = jest.fn(() => true);

    const deleteByIdMock = jest.fn();
    const createUserMock = jest.fn();
    const isUserExistMock = jest.fn(() => false);
    const findByEmailMock = jest.fn(() => ({
        email: EMAIL,
        password: PASSWORD
    }));

    const findAllMock = jest.fn(() => []);
    const findMock = jest.fn(() => []);

    beforeAll(async () => {

        jest.unstable_mockModule("../../src/repository/UserRepository.js", () => {
            return {
                default: class {
                    createUser = createUserMock;
                    isUserExist = isUserExistMock;
                    findByEmail = findByEmailMock;
                    deleteById = deleteByIdMock;
                    findAll = findAllMock;
                    find = findMock;
                }
            }
        });

        jest.unstable_mockModule("bcrypt", () => {
            return {
                hash: hashMock,
                compare: compareMock
            }
        })


        const UserService = (await import("../../src/service/UserService.js")).default;
        service = new UserService()
    });

    describe("User creation", () => {
        it("should create user", async () => {
            await service.create(EMAIL, PASSWORD);

            expect(createUserMock).toBeCalledWith(EMAIL, PASSWORD);
        });

        it("should throw error for user which exist by EMAIL", async () => {
            isUserExistMock.mockImplementation(() => true);

            await expect(service.create(EMAIL, PASSWORD))
                .rejects.toThrow(new ValidationError("User already exist"));
        });

        it("throw ValidationError without email", async () => {
            await expect(service.create(undefined, PASSWORD))
                .rejects.toThrow(new ValidationError("parameter not provided"));
        });

        it("throw ValidationError without password", async () => {
            await expect(service.create(EMAIL, undefined))
                .rejects.toThrow(new ValidationError("parameter not provided"));
        });

    });

    describe("Password check", () => {

        it("should successfully verify password comparing", async () => {
            const result = await service.checkPassword(EMAIL, PASSWORD);

            expect(findByEmailMock).toBeCalledWith(EMAIL);
            expect(result).toBeTruthy();
        });

        it("should Unsuccessfully verify password comparing", async () => {
            compareMock.mockImplementation(() => false);

            const result = await service.checkPassword(EMAIL, PASSWORD);

            expect(findByEmailMock).toBeCalledWith(EMAIL);
            expect(result).toBeFalsy();
        });

        it("should Unsuccessfully verify for NON exist user", async () => {
            findByEmailMock.mockImplementation(() => undefined);

            const result = await service.checkPassword(EMAIL, PASSWORD);

            expect(findByEmailMock).toBeCalledWith(EMAIL);
            expect(result).toBeFalsy();
        });

        it("throw ValidationError without email", async () => {
            await expect(service.checkPassword(undefined, PASSWORD))
                .rejects.toThrow(new ValidationError("parameter not provided"));
        });

        it("throw ValidationError without password", async () => {
            await expect(service.checkPassword(EMAIL, undefined))
                .rejects.toThrow(new ValidationError("parameter not provided"));
        });

    });

    describe("delete user by Id", () => {
        it("User should be deleted", async () => {
            const USER_ID = "user1";
            await service.deleteById(USER_ID);
            expect(deleteByIdMock).toBeCalledWith(USER_ID);
        });

        it("should handle errors on delete", async () => {
            const ERROR_MESSAGE = "Deletion failed";
            deleteByIdMock.mockImplementationOnce(() => {
                throw new Error(ERROR_MESSAGE);
            });
            await expect(service.deleteById("user2")).rejects.toThrow(ERROR_MESSAGE);
        });
    })

    describe("getUsers method", () => {

        it("should retrieve all users when no parameters are given", async () => {
            await service.getUsers();
            expect(findAllMock).toHaveBeenCalled();
        });

        it("should use pagination when offset and limit are provided", async () => {
            const OFFSET = 5, LIMIT = 10;
            await service.getUsers(OFFSET, LIMIT);
            expect(findMock).toHaveBeenCalledWith(OFFSET, LIMIT);
        });

        it("should map user data correctly", async () => {
            const expectedUser = {
                userId: "1",
                name: "John Doe",
                createdAt: new Date(),
            }

            const users = [
                {
                    id: expectedUser.userId,
                    name: expectedUser.name,
                    created_at: expectedUser.createdAt,
                    password: PASSWORD
                }];

            findAllMock.mockReturnValueOnce(users);

            const result = await service.getUsers();
            expect(result).toEqual([expectedUser])
        });
    });

});
