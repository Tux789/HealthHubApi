const passport = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const db = require("../models");


module.exports = router;
router.get("/", (req, res)=>{
    res.send("Yo");
})
router.post("/api/login", passport.authenticate('local-signin', { successRedirect: "/", failureRedirect: '/api/autherror' }),
function (req, res) {
    res.status("200").send();
});
router.post("/api/signup", (req, res) => {
        db.User.findOne({email: req.body.email})
        .then((user) => {
            if(!user)
            {
                db.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: passport.generateHash(req.body.password)
                })
                .then((newUser) => res.json(newUser))
                .catch((err) => res.status("500").json(err))
            }else{
                console.log("User Already Exists");
                res.status("401").send("User Already Exists");
            }
        })
        .catch((err)=>res.send("500").json(err));
    });

router.get("/api/autherror", (
    req, res) => {
        res.status("401").send();
    });
    router.get("/api/testRoute", (req, res) =>{
        res.status("200").json({text:"yo"});
    });
    router.post("/api/testRoute", (req, res) =>{
        res.status("200").json({text:"yo"});
    });