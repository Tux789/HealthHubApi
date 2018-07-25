const passport = require("../controllers/authController");
const express = require("express");
const router = express.Router();


module.exports = router;

router.post("/api/login", passport.authenticate('local-signin', { failureRedirect: '/api/autherror' }),
function (req, res) {
    res.status("200").send();
});
router.post("/api/signup", passport.authenticate('local-signup',{ failureRedirect: '/api/autherror' }),
(req, res) => {
    res.status("200").send();
});
router.get("/api/autherror", (
    req, res) => {
        res.status("401").send();
    });