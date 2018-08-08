const db = require('../models');
const mongoose = require("mongoose");

const cc = {
    getChartData: (userId, goalType) => {
        return new Promise((resolve, reject) => {
            db.Activities.find({ _userId: userId, goalType: goalType }).sort({ postDate: -1 })
                .then((dbActivities) => {
                    const returnData = [];
                    let parameterStr = '';
                    switch (goalType) {
                        case "TRACK SMOKING":
                            dbActivities.map((activity) => returnData.push(activity.currentSmokes));
                            break;
                        case "TRACK EXERCISE":
                            dbActivities.map((activity) => returnData.push(activity.currentExerciseMinutes));
                            break;
                        case "TRACK SLEEP":
                            dbActivities.map((activity) => returnData.push(activity.currentSleepHours));
                            break;
                        case "IMPROVE SOCIAL INTERACTIONS":
                            dbActivities.map((activity) => returnData.push(activity.currentSocialOutings));
                            break;
                        default:
                            reject("ERROR: NOT A VALID GOAL TYPE");
                            break;
                    }
                    console.log(dbActivities,returnData);
                    resolve(returnData);
                })
                .catch((err) => {
                    console.log("ERROR IN CHART DATA: " + err)
                    reject(err);
                });
        })
    },
    getChartDataForActivity(userId){
        activityArray.map((activity) => {

        })
    }

}
module.exports = cc;