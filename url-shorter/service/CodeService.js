import Instance from "../helper/Instance.js";
import {generateString} from "../utils/randomString.js";
import UrlRepository from "../repository/UrlRepository.js";

export default class CodeService extends Instance{
    #urlRepository;

    constructor(props) {
        super(props);

        this.#urlRepository = UrlRepository.getInstance();
    }

    generateCode(){
        let code = generateString(5);
        if (this.isCodeExist(code)){
            code = this.generateCode()
        }

        return code;
    }


    isCodeExist(code){
        return this.#urlRepository.isExist(code)
    }
}
