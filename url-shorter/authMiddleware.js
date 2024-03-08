const users = {
    "serhii":"admin"
}

export default (req, res, next) => {
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
