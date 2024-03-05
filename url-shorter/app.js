import express from "express"
import service from "./service.js"
import authMiddleware from "./authMiddleware.js";
import userRouter from "./userRouter.js"

const app = express();


app.use("/user", userRouter);
app.use("/info", (req, res, next) => {
    req.session = {
        status: "created"
    }

    if (req.method === "GET") {
        next();
    }

    throw new Error(404);

})
app.use(authMiddleware);

// middleware
app.post("/add", express.json(),
    (req, res) => {
        console.log(req.body);

        const code = "QWER";
        service.add(code, req.body);

        res.json({code});
    });

app.get("/info/:code", (req, res, next) => {
    const data = service.get(req.params.code);

    res.setHeader("Session", JSON.stringify(req.session));
    res.json(data);
    next();
})

app.use("/info", (req, res, next) => {
    console.log("Path:", req.path);
    next();
});

app.get("/test",
    (req, res, next) => {
        req.session = {
            userId: req.query.userId
        }

        next();


        console.log("AFTER 1st midle");
    },
    (req, res, next) => {
        if (req.session.userId === "1234") {
            next()
        } else {
            res.status(401).send();
        }
        console.log("AFTER 2st midle");
    },
    (req, res, next) => {
        req.session.path = req.path;
        throw new Error("MY error")

        res.status(200).end("Passsed");
        console.log("AFTER 3st midle");

    }
)

app.use((err, req, res, next) => {
    console.log(err);

    res.status(501).send(err.message)
})

app.listen(3001, () => {
    console.log("Server Started");
})


// {
//     "/info": [h1,h2,h3]
// }
//

// use(/info , h1)
// get(h2) -> req.method === GET
// use(h3)
