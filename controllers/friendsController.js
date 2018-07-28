const db = require('../models');

exports.default = {
getFriends = (req, res) =>{
    console.log(req.user);
   db.User.findById(req.user.id)
    .then((dbUser) =>{
       res.json(dbUser.friends);
    })
    .catch((err) => res.status("500").send(err));
},
addFriends = (req, res) =>{
    db.User.findOneAndUpdate({_id: req.user.id}, {$push: {friends: req.params.friendId}},{new: true, upsert:true})
    .then((results)=>{
        console.log(results);
        res.json(results);
    })
},
}