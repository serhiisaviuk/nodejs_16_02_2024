import Instance from "../helper/Instance.js";
import UserService from "./UserService.js";
import CodeService from "./CodeService.js";
import {generate} from "../utils/storageGenerators.js";
import UrlRepository from "../repository/UrlRepository.js";


const sequenceName = "url";

export default class UrlService extends Instance {
    #userService;
    #codeService;
    #urlRepository;

    constructor() {
        super();
        this.#userService = UserService.getInstance();
        this.#codeService = CodeService.getInstance();
        this.#urlRepository = UrlRepository.getInstance();
    }

    createUrl(userId, urlModel) {
        //TODO validation here: name, user
        const code = this.#codeService.generateCode();
        urlModel.code = code;
        urlModel.userId = userId;
        urlModel.id = generate(sequenceName);

        this.#urlRepository.save(urlModel);

    }

    visitUrl(code){
        return this.#urlRepository.getAndIncrement(code);

    }
}
