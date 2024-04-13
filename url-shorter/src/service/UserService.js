import UserRepository from "../repository/UserRepository.js";
import Instance from "../helper/Instance.js";
import * as bcrypt from "bcrypt";
import ValidationError from "../error/ValidationError.js";
import logger from "example-logger/lib/logger/logger.js";

const log = logger.getLogger("UserService");

export default class UserService extends Instance {
    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    async create(email, password) {
        if (!email) {
            throw new ValidationError("parameter not provided", "email");
        }

        if(!password){
            throw new ValidationError("parameter not provided", "password");
        }

        const isExist = await this.userRepository.isUserExist(email);

        if (isExist) {
            throw new ValidationError("User already exist");
        }

        const passwordHash = await hashPassword(password);

        await this.userRepository.createUser(email, passwordHash);
    }

    async getUsers(offset = 0, limit = 0) {
        let users;
        if (offset === 0 && limit === 0) {
            users = await this.userRepository.findAll();
        } else {
            users = await this.userRepository.find(offset, limit);
        }

        return users.map(filterUserData);
    }

    async checkPassword(email, password) {
        if (!email) {
            throw new ValidationError("parameter not provided", "email");
        }

        if(!password){
            throw new ValidationError("parameter not provided", "password");
        }

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            return false;
        }

        const result = await bcrypt.compare(password, user.password);

        return !!result;
    }

    async deleteById(id) {
        try {
            await this.userRepository.deleteById(id);
        } catch (e) {
            log.error(e);
            throw e;
        }
    }
}


async function hashPassword(input) {
    return bcrypt.hash(input, 10);
}

function filterUserData(user) {
    return {
        userId: user.id,
        name: user.name,
        createdAt: user.created_at
    }
}
