const passport = require("../controllers/authController");
const express = require("express");
const router = express.Router();


module.exports = router;

router.post("/api/login", passport.authenticate('local-signin', { failureRedirect: '/api/autherror' }),
function (req, res) {
    res.status("200").send();
});
router.post("/api/signup", (req, res) => {
        db.User.findOne({email: req.params.email})
        .then((user) => {
            if(!user)
            {
                db.User.create({
                    username: req.params.username,
                    email: req.params.email,
                    password: passport.generateHash(req.params.password)
                })
                .then((newUser) => newUser)
                .catch((err) => res.status("500").json(err))
            }else{
                console.log("User Already Exists");
                res.status("401").send("User Already Exists");
            }
        })
        .catch((err)=>cb(err));
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