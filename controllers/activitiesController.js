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
    getActivitiesForUser: (req,res, userId) => {
        console.log(userId);
        db.Acitvities.find({_userId: userId})
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
            res.status("500").send();
        })
    },

}
module.exports = ac;