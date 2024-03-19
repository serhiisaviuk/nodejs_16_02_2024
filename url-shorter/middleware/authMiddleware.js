const users = {
    "serhii":"admin"
}

function basicAuthorizationMiddleware(req, res, next)  {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const [name, password] = auth.substring(6, auth.length).split(":");
        if(users[name] === password){
            next();
            return;
        }
    }

    res.status(401).end("Auth header not provided");
}

function authorizedInSessionMiddleware(req, res, next) {
    if (req.session.login) {
        return next();
    }

    res.status(401).send("Unauthorized");
}

export {authorizedInSessionMiddleware, basicAuthorizationMiddleware}
