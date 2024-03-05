import express from "express";

const router = new express.Router();


router.get("/name", (req,res,next) =>{
    res.send("Serhii")
})
router.get("/email", (req,res,next) =>{
    res.send("serhii@gmail.com");
})

export default router;
