const db = require('../models');
const mongoose = require("mongoose");

const ac = {
    getActivities: (req, res) => {
        console.log(req.user);
        db.Acitvities.find({_userId: req.user.id})
            .then((dbActivities) => {
                res.json(dbActivities);
            })
            .catch((err) => {
                console.log(err);
                res.status("500").send(err)});
    },
    getActivitiesForUser: (req, res, userId) => {
        console.log(userId);
        db.Acitvities.find({_userId: userId},null,{sort: {date: -1}, limit: 5})
            .then((dbActivities) => {
                res.json(dbActivities);
            })
            .catch((err) => {
                console.log(err);
                res.status("500").send(err)}
            );
    },
    addActivity: (req,res) => {
        db.Acitvities.create(req.body)
        .then((results) => {
            res.json(results);
        })
        .catch((err) =>{
            console.log(err);
            res.status("500").send(err);
        })
    },
    addComment: (req, res) => {
        db.Activities.findOneAndUpdate({ _id: req.params.id},
            { $push: { 
                _userId: req.user.id,
                comment: req.params.friendId } },
            { new: true, upsert: true })
            .then((results) => res.json(results))
            .catch((err) => {
                console.log(err);
                res.status("500").send(err);
            })
    }

}
module.exports = ac;