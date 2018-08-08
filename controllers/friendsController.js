const db = require('../models');
const mongoose = require("mongoose");

const fc = {
    getFriends: (req, res) => {
        console.log(req.user);
        db.User.findById(req.user.id)
            .then((dbUser) => {
                res.json(dbUser.friends);
            })
            .catch((err) => res.status("500").send(err));
    },
    addFriends: (req, res) => {
        db.User.findById(req.user.id)
            .then((dbUser) => {
                if (dbUser.friends.indexOf(req.params.friendId) === -1) {
                    console.log("Friend not found");
                    db.User.findOneAndUpdate(
                        { _id: req.user.id },
                        { $push: { friends: req.params.friendId } },
                        { new: true, upsert: true })
                        .then((results) => {
                            console.log(results);
                            db.User.findOneAndUpdate(
                                { _id: req.params.friendId },
                                { $push: { friends: req.user.id } },
                                { new: true, upsert: true })
                                .then((results2) => {
                                    console.log(results2);
                                    res.json(results2);
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status("500").send();
                        })
                } else {
                    res.status("304").send();
                }
            })
            .catch((err) => {
                console.log(err);
                res.status("500").send(err);
            })

    },
    addFriendsByEmail: (req, res) => {
        db.User.find({email: req.body.email})
        .then((dbFriend) => {
            console.log("Friend Found: " + dbFriend);

            db.User.findById(req.user.id)
            .then((dbUser) => {
                console.log("Current User: " + dbUser);
                if (dbUser.friends.indexOf(dbFriend._id) === -1) {
                    console.log("Friend not found");
                    db.User.findOneAndUpdate(
                        { _id: req.user.id },
                        { $push: { friends: dbFriend._id } },
                        { new: true, upsert: true })
                        .then((results) => {
                            console.log(results);
                            db.User.findOneAndUpdate(
                                { _id: dbFriend._id },
                                { $push: { friends: req.user.id } },
                                { new: true, upsert: true })
                                .then((results2) => {
                                    console.log(results2);
                                    res.json(results2);
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status("500").send();
                        })
                } else {
                    res.status("304").send();
                }
            })
            .catch((err) => {
                console.log(err);
                res.status("500").send(err);
            })            
        })
    }
}
module.exports = fc;