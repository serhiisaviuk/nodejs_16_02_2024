import * as crypto from "crypto";

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString("hex")
        .slice(0, length);
}

export default generateRandomString;
