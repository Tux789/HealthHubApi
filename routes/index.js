const passport = require("../controllers/authController");
const express = require("express");
const router = express.Router();


module.exports = router;

router.post("/api/login", passport.authenticate('local-signin', { failureRedirect: '/api/autherror' }),
function (req, res) {
    res.status("200").send();
});
router.post("/api/signup",
(req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
          return res.status("500").send({success: false, message: "ERROR: " + err}); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
          return res.status("401").send({ success : false, message : 'authentication failed' });
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.send({ success : true, message : 'authentication succeeded' });
        });      
      })(req, res, next);
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