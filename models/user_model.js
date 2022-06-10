const mongoose = require("mongoose");
const validator = require("validator");
const passportMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
    {
        userInfoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User_Extra_Info",
        },
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
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(passportMongoose);

module.exports = mongoose.model("User", userSchema);
