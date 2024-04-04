export default class Instance{
    static instance;
    constructor() {
    }

    static getInstance(...args){
        if(this.instance){
            return this.instance;
        }

        this.instance = new this(...args);

        return this.instance;
    }
}
