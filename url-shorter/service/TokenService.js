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
        // const payload = generateRandomString(32);

        const payload = Buffer.from(JSON.stringify({
            userId,
            nonce: Date.now()
        })).toString("base64");

        const signature = crypto.createHmac("sha256", SECRET)
            .update(payload)
            .digest('base64');

        const token = `${payload}.${signature}`;
        // storage.add(token)
        return token;
    }

    checkToken(token) {

        const [payload, signature] = token.split(".");

        const expectedSignature = crypto.createHmac("sha256", SECRET)
            .update(payload)
            .digest('base64');

        if(signature === expectedSignature){
            const o = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
            return o.userId
        }

        return null; //TODO  new error
    }

    revokeToken(token) {
        // storage.delete(token);
        return true;
    }
}
