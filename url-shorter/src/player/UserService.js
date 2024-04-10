import UserRepository from "./UserRepository.js";

export default class UserService{
    #userRepository;

    constructor() {
        this.#userRepository = new UserRepository();
    }

    create(name){
        this.#userRepository.create(name);
        return "Done";
    }
}
