import Instance from "../helper/Instance.js";
import generateRandomString from "../utils/cryptoRandomString.js";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";

// const storage = new Set();

const SECRET = "my_secret";

export default class TokenService extends Instance {
    constructor() {
        super();
    }

    generateToken(userId) {

        const payload = {
            userId,
            nonce: Date.now()
        };

        const token = jwt.sign(payload, SECRET, {expiresIn:"10000"});

        // const RefreshToken = jwt.sign(token, SECRET, {expiresIn:"1h"});

        return {token};
    }

    checkToken(token) {

        const payload = jwt.verify(token, SECRET)

        if(payload.exp > Math.ceil(Date.now()/1000)){
            return payload.userId
        }
        return null;

    }

    revokeToken(token) {
        // storage.delete(token);
        return true;
    }
}
