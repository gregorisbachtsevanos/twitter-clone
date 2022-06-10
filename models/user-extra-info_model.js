const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        bio:{
            type: String,
            trim: true,
            maxLength: 120
        },
        gender: {
            type: String,
            require: true,
            trim: true,
            lowercase: true,
            enum: ["male", "female"],
        },
        year_of_birth: {
            type: Number,
            require: true,
            trim: true,
        },
        month_of_birth: {
            type: Number,
            require: true,
            trim: true,
        },
        day_of_birth: {
            type: Number,
            require: true,
            trim: true,
        },
        facebook: {
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
        twitter: {
            type: String,
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        youtube: {
            type: String,
            trim: true,
        },
        github: {
            type: String,
            trim: true,
        },
        upwork: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User_Extra_Info", userSchema)