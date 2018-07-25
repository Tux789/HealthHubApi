const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const UserSchema = new Schema({
    // `title` is of type String
    username: {
        type: String,
        required: true,

    },
    // `body` is of type String
    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    friends: [],

    goals: [],
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the Note model
module.exports = User;