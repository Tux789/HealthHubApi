
const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const db = require('../models');


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use('local-signin', new Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
    function (email, password, cb) {
        db.User.findOne({ email: email })
            .then((user) => {
                console.log("user: " + user);
                if (!user) {
                    console.log("User not found");
                   return cb(null,false);
                    }
                else if (!isValidPassword(user.password,password)) {
                    console.log("Invalid Password");
                     return cb(null, false); 
                    }
                else
                return cb(null, user);
            }).catch((err) => {
                return cb(err);
            })
    }));
passport.use('local-signup', new Strategy({
    usernameField : "email",
    passwordField: 'password',
    passReqToCallback : true,

},function(username, email,password,cb){
db.User.findOne({email: email})
    .then((user) => {
        if(!user)
        {
            const hashedPassword = generateHash(password);
            const data = {
                username: username,
                email: email,
                password: hashedPassword,
            };
            db.User.create(data)
            .then((newUser) => cb(null,newUser));
        }else{
            console.log("User Already Exists");
            return cb(null, false);
        }
    })
}));


function createNewUser(username, password, cb) {
    db.User.create({
        username: username,
        password: generateHash(password),
    }).then(function (user) {
        console.log(user);
        return cb(null, user);
    }).catch((err) => {
        return cb(err);
    })
};

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    db.User.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

const generateHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(process.env.HASH_VALUE || 8), null);
};
const isValidPassword = function(userpass,password){
    return bCrypt.compareSync(password, userpass);
  }
module.exports = passport;