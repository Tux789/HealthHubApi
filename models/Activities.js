
// 2 - code validations for passwords etc
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionsSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    goalType: { type: String, required: true },
    goalEnum: ['TRACK SMOKING', 'TRACK EXERCISE', 'TRACK SLEEP', 'TRACK WEIGHT','IMPROVE SOCIAL INTERACTIONS'],
    smokingMethod: { type: String, required: true }, 
    smokingEnum: ['CIGARETTE', 'CIGAR', 'E-CIGARETTE', 'PIPE'],
    cigarettesSmokedPerDay: { type: Number, required: true },
    cigarsSmokedPerDay: { type: Number, required: true },
    howManyOneGramCatridgesPerWeek: { type: Number, required: true },
    howManyPipesSmokedPerDay: { type: Number, required: true },
    exerciseEnum: ['HIGH INTENSITY', 'MEDIUM INTENSITY', 'LOW INTENSITY'],
    currentExerciseMinutes: {type: Number, required: true },
    currenSleepHours: {type: Number, required: true },
    currentWeight: {type: Number, required: true },
    currentSocialOutings: {type: Number, required: true },
    currentSocialHours: {type: Number, required: true },
    comments: [
        {
            _userId:{
            type: Schema.Types.ObjectId,
            ref: "User"
            },
            comment: String,
            postDate: {
                type: Date,
                default: Date.now
            },
        },
    ]
});

///
const Activities = mongoose.model('Activities', ActionsSchema)

module.exports = Activities;

//const Book = mongoose.model("Book", bookSchema);
