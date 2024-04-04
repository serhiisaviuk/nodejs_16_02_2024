import TokenService from "../service/TokenService.js";

const users = {
    "serhii": "admin"
}

const tokenService = TokenService.getInstance();

function basicAuthorizationMiddleware(req, res, next) {
    const auth = req.header("Authorization");

    if (auth?.startsWith("Basic ")) { //base64 encoding
        const [name, password] = Buffer.from(auth.substring(6, auth.length), "base64")
            .toString("utf8")
            .split(":");

        if (users[name] === password) {
            next();
            return;
        }
    }

    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).end("Auth header not provided");
}


function bearerAuthMiddleware(req, res, next) {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Bearer ")) {
        const token = auth.substring(7, auth.length);

        const userId = tokenService.checkToken(token);
        console.log("Authorized:", userId);
        if (userId) {
            return next();
        }
    }

    res.status(401).end("Auth BEARER header not provided");
}

function authorizedInSessionMiddleware(req, res, next) {
    if (req.session.login) {
        return next();
    }

    res.status(401).send("Unauthorized");
}

export {
    authorizedInSessionMiddleware,
    basicAuthorizationMiddleware,
    bearerAuthMiddleware
}
