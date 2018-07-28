const db = require('../models');

getFriends = (userId) =>{
    return db.User.findById(userId)
    .then((dbUser) =>{
        return dbUser.friends;
    });
}