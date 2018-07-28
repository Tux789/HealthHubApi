const db = require('../models');

getFriends = (req, res) =>{
   db.User.findById(req.user.id)
    .then((dbUser) =>{
       res.json(dbUser.friends);
    })
    .catch((err) => res.status("500").send(err));
}
addFriends = (req, res) =>{
    db.User.findOneAndUpdate({_id: req.user.id}, {$push: {friends: req.params.friendId}},{new: true, upsert:true})
    .then((results)=>{
        console.log(results);
        res.json(results);
    })
}