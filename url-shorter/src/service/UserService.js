import UserRepository from "../repository/UserRepository.js";
import Instance from "../helper/Instance.js";
import * as bcrypt from "bcrypt";
import ValidationError from "../error/ValidationError.js";


export default class UserService extends Instance {
    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    async create(email, password) {
        const isExist = await this.userRepository.isUserExist(email);

        if (isExist) {
            throw new ValidationError("User already exist");
        }

        const passwordHash = await this.hashPassword(password);

        await this.userRepository.createUser(email, passwordHash);
    }

    async hashPassword(input) {
        return await bcrypt.hash(input, 10);
    }

    async getUsersPublicData() {
        const users = await this.userRepository.getAll();

        const result = [];
        for (const user of users) {
            result.push(filterUserData(user))
        }

        return result;
    }

    getUser(userId) {
        const user = this.userRepository.get(userId);
        return filterUserData(user);
    }

    async checkPassword(name, password) {
        if (!name || !password) {
            return false;
        }

        const user = this.userRepository.getUserByName(name);

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return true;
        }

        return false;
    }

}


function filterUserData(user) {
    return {
        userId: user.userId,
        name: user.name
    }
}
