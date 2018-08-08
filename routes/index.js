const passport = require("../controllers/authController");
const fc = require("../controllers/friendsController");
const ac = require("../controllers/activitiesController")
const express = require("express");
const router = express.Router();
const db = require("../models");


module.exports = router;
router.get("/", (req, res) => {
    res.send("Yo");
})
router.post("/api/login", passport.authenticate('local-signin'),
    function (req, res) {
        res.status("200").send();
    });
router.post("/api/signup", (req, res) => {
    db.User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                db.User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: passport.generateHash(req.body.password)
                })
                    .then((newUser) => res.json(newUser))
                    .catch((err) => {
                        console.log("Error in Create Account " + err)
                        res.status("500").json(err)
                    })
            } else {
                console.log("User Already Exists");
                res.status("401").send("User Already Exists");
            }
        })
        .catch((err) => {
            console.log("Error in Create Account " + err);
            res.send("500").json(err)
        });
});

router.get("/api/isAuth", isLoggedIn, (
    req, res) => {
    res.status("200").send();
});
router.get("/api/testRoute", (req, res) => {
    res.status("200").json({ text: "yo" });
});
router.post("/api/testRoute", (req, res) => {
    res.status("200").json({ text: "yo" });
});
router.get("/api/friends", isLoggedIn, (req, res) => {
    fc.getFriends(req, res);
})
router.get("/api/friends/:friendId", isLoggedIn, (req,res) => {
    ac.getActivitiesForUser(req, res, req.params.friendId);
})
router.put("/api/friends/:friendId", isLoggedIn, (req, res) => {
    fc.addFriends(req, res);
})
router.put("/api/friends", isLoggedIn, (req, res) => {
    fc.addFriendsByEmail(req, res);
})
router.get("/api/activities", isLoggedIn, (req, res) =>{
    ac.getActivities(req,res);
})
router.get("/api/activities/:id",isLoggedIn, (req,res) => {
    ac.getActivitiesForUser(req, res, req.params.id);
})
router.post("/api/activities", isLoggedIn, (req, res) => {
    ac.addActivity(req, res);
})
router.put("/api/activities/:id", isLoggedIn, (req, res) => {
    ac.addComment(req, res);
})
router.get("/api/activities/feed", isLoggedIn, (req,res) =>{
    ac.getActivitiesFeed(req, res);
})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.status("401").send();
    }
}