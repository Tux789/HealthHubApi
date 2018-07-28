const db = require('../models');

const fc = {
getFriends: (req, res) => {
    console.log(req.user);
   db.User.findById(req.user.id)
    .then((dbUser) =>{
       res.json(dbUser.friends);
    })
    .catch((err) => res.status("500").send(err));
},
addFriends: (req, res) => {
    db.User.findById(req.user.id)
    .then((dbUser) => {
        if (dbUser.friends.indexOf(req.params.friendId)===-1){
            db.User.findOneAndUpdate(
                {_id: mongoose.ObjectId(req.user.id)}, 
                {$push: {friends: req.params.friendId}},
                {new: true,  upsert:true})
            .then((results)=>{
                console.log(results);
                db.findOneAndUpdate(
                    {_id: req.params.friendId},
                {$push: {friends: req.user.id}},
            {new: true, upsert:true})
            .then((results2) => {
                res.json(results2);
            })
            })
        }else{
            res.status("304").send();
        }
    })
    .catch((err) => res.status("500").send(err));
       
},
}
module.exports = fc;