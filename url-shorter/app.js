import express from "express"
import authMiddleware from "./authMiddleware.js";
import UserController from "./controller/UserController.js";

const app = express();

app.use(express.json());

app.all("/", (req, res)=>{
    res.send("Works!");
});

app.use("/user", new UserController());

// app.use(authMiddleware);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).send(err.message);
});

app.set("views", "view");
app.set("view engine", "ejs");

app.get("/get_pug", (req,res)=>{
    res.render("index.pug", {name:"ADMIN"});
});

app.get("/get_ejs", (req,res)=>{
    res.render("index", {password:"QWERTY"});
})

app.use("/files", express.static("view"));


app.listen(3001, () => {
    console.log("Server Started, port: http://127.0.0.1:3001/");
})
