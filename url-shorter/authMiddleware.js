const users = {
    "serhii":"admin"
}

export default (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const authData = auth.substring(6, auth.length).split(":");
        if(users[authData[0]] === authData[1]){
            next();
            return;
        }
    }

    res.status(401).end("Auth header not provided");
}
