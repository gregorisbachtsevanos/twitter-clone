const mongoose = require("mongoose");
const validator = require("validator");
const passportMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
            trim: true,
        },
        surname: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        extra_info: {
            phone:{
                type: Number,
                trim: true,
                min: 10,
                max: 10,
            },
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
        }
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(passportMongoose);

module.exports = mongoose.model("User", userSchema);
