import UserRepository from "../repository/UserRepository.js";
import UserModel from "../models/UserModel.js";
import {generate} from "../utils/storageGenerators.js";
import Instance from "../helper/Instance.js";
import config from "../config.js";
import generateRandomString from "../utils/cryptoRandomString.js";
import crypto from "crypto";


const sequenceName = "user";

export default class UserService extends Instance {
    constructor() {
        super();
        this.userRepository = new UserRepository();
    }

    async create(name, password) {

        const user = new UserModel(generate(sequenceName), name, this.hashPassword(password));

        console.log(user);

        this.userRepository.save(user);
    }

    hashPassword(input, salt = Buffer.from(generateRandomString(16)).toString("base64")) {
        //salt
        const peperSecret = config.serverPeper;

        const password = crypto.createHmac("sha256", peperSecret)
            .update(input)
            .update(salt)
            .digest('base64')

        return `${salt}.${password}`
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

    checkPassword(name, password) {
        if (!name || !password) {
            return false;
        }

        const user = this.userRepository.getUserByName(name);

        const [salt, passwordHash] = user.password.split(".");

        if (user?.password === this.hashPassword(password, salt)) {
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
