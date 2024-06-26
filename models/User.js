const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        requireed: true,
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    location: {
        type: String,
    },
    countryoforigin: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)