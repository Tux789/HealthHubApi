
// 2 - code validations for passwords etc

const ActionsSchema = new Schema({
    _userId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },

    goalType: { type: String, required: true },
    enum: ['TRACK SMOKING', 'TRACK EXERCISE', 'TRACK SLEEP', 'TRACK WEIGHT','IMPROVE SOCIAL INTERACTIONS'],
    smokingMethod: { type: String, required: true }, 
    enum: ['CIGARETTE', 'CIGAR', 'E-CIGARETTE', 'PIPE'],
    cigarettesSmokedPerDay: { type: Number, required: true },
    howManyOneGramCatridgesPerWeek: { type: Number, required: true },
    howManyPipesSmokedPerDay: { type: Number, required: true },
    currentEstimatedHours: {type: Number, required: true }
});

///
const Book = mongoose.model('Activities', ActionsSchema)

module.exports = Activities;

const Book = mongoose.model("Book", bookSchema);
