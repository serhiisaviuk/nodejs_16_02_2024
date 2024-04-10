import Instance from "../helper/Instance.js";
import {generateString} from "../utils/randomString.js";
import UrlRepository, {isExist} from "../repository/UrlRepository.js";

export default class CodeService extends Instance{
    #urlRepository;

    constructor(props) {
        super(props);

        this.#urlRepository = new UrlRepository();
    }

    generateCode(){
        let code = generateString(5);
        if (this.#isCodeExist(code)){
            code = this.generateCode()
        }

        return code;
    }


    #isCodeExist(code){
        return isExist(code);
    }
}
