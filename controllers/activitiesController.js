const db = require('../models');
const mongoose = require("mongoose");
const cc = require("./chartController");

const ac = {
    getActivities: (req, res) => {
        console.log(req.user);
        db.Activities.find({ _userId: req.user.id })
            .then((dbActivities) => {
                cc.getChartData(userId, dbActivities.goalType)
                    .then((chartData) => {
                        dbActivities.chartData = chartData;
                        res.json(dbActivities);
                    })
            })
            .catch((err) => {
                console.log(err);
                res.status("500").send(err)
            });
    },
    getActivitiesForUser: (req, res, userId) => {
        //check to see if target(userId) is in current user's(req.user) friends list
        db.User.findById(req.user.id)
            .then((dbUser) => {
                //if in friends list then get activities
                if (dbUser.friends.indexOf(userId) !== -1) {
                    console.log(userId);
                    db.Activities.find({ _userId: userId }).sort({ postDate: -1 }).limit(5)
                        .then((dbActivities) => {
                            cc.getChartData(userId, dbActivities.goalType)
                                .then((chartData) => {
                                    dbActivities.chartData = chartData;
                                    res.json(dbActivities);
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status("500").send(err)
                        });
                }
                //if target is NOT in currrent user's friends list send 401 (Unauthorized)
                else {
                    console.log("ERROR: target is not in friends list");
                    res.status("401").send("Not In Friends list")
                }
            })
            .catch((err) => {
                console.log("ERROR in getActivitiesForUser " + err);
                res.status("500").send(err);
            })
    },
    addActivity: (req, res) => {
        req.body._userId = req.user.id;
        console.log(req.body);
        db.Activities.create(req.body)
            .then((results) => {
                res.json(results);
            })
            .catch((err) => {
                console.log(err);
                res.status("500").send(err);
            })
    },
    addComment: (req, res) => {
        //check to make sure target (req.params.id) is in current user's (req.user) friends list
        db.User.findById(req.user.id)
            .then((dbUser) => {
                db.Activities.findById(req.params.id)
                    .then((dbActivity) => {
                        //target is in friends list, execute logic
                        if (dbUser.friends.indexOf(dbActivity._userId) !== -1 || 
                        req.user.id === dbActivity._userId) {
                            db.Activities.findOneAndUpdate({ _id: req.params.id },
                                {
                                    $push: {
                                        _userId: req.user.id,
                                        comment: req.body.comment
                                    }
                                },
                                { new: true, upsert: true })
                                .then((results) => res.json(results))
                                .catch((err) => {
                                    console.log(err);
                                    res.status("500").send(err);
                                })
                        }
                        //if activity's owner is NOT in current user's friends list return 401 (Unauthorized) 
                        else {
                            console.log("ERROR: friend not in friends list");
                            res.status("401").send("ERROR: friend not in friends list");
                        }
                    })
            })
            .catch((err) => {
                console.log("ERROR: in addComment " + err);
                res.status("500").send(err);
            })
    },
    getActivitiesFeed: (req, res) => {
        db.User.findById(req.user.id)
            .then((dbUser) => {
                const feed = [];
                dbUser.friends.map((friend) =>
                    db.Activities.find({ _userId: friend }).sort({ postDate: -1 }).limit(5)
                        .then((dbActivities) => {
                            cc.getChartData(userId, dbActivities.goalType)
                                .then((chartData) => {
                                    dbActivities.chartData = chartData;
                                    feed.push(dbActivities);
                                })
                        }));
                feed.sort((a, b) => { return b.postDate - a.postDate })
                res.json(feed);
            })
            .catch((err) => {
                console.log("Error in Get Feed: " + err);
                res.status("500").send(err);
            });
    }
}
module.exports = ac;