
// 2 - code validations for passwords etc
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionsSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postDate: {
        type: Date,
        default: Date.now
    },

    goalType: { 
        type: String, 
        required: true,
        enum: ['TRACK SMOKING', 'TRACK EXERCISE', 'TRACK SLEEP', 'TRACK WEIGHT','IMPROVE SOCIAL INTERACTIONS']
    },
    // smokingMethod: { type: String, required: true }, 
    // smokingEnum: ['CIGARETTE', 'CIGAR', 'E-CIGARETTE', 'PIPE'],
   currentSmokes: { type: Number},
    // cigarsSmokedPerDay: { type: Number, required: true },
    // howManyOneGramCatridgesPerWeek: { type: Number, required: true },
    // howManyPipesSmokedPerDay: { type: Number, required: true },
    exerciseEnum: ['HIGH INTENSITY', 'MEDIUM INTENSITY', 'LOW INTENSITY'],
    currentExerciseMinutes: {type: Number},
    currenSleepHours: {type: Number},
    currentWeight: {type: Number},
    currentSocialOutings: {type: Number},
    //currentSocialHours: {type: Number, required: true },
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
