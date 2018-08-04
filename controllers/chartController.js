const db = require('../models');
const mongoose = require("mongoose");

const cc = {
    getChartData: (userId, goalType) => {
        return new Promise((resolve, reject) => {
            db.Activities.find({ _userId: userId, goalType: goalType })
                .then((dbActivities) => {
                    console.log(dbActivities);
                    resolve(dbActivities);
                })
                .catch((err) => {
                    console.log("ERROR IN CHART DATA: " + err)
                    reject(err);
                });
        })
    }
}
module.exports = cc;