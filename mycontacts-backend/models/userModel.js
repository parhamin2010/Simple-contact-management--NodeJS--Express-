const mongoos = require('mongoose');
const {mongo} = require("mongoose");

const userSchema = mongoos.Schema({
    username:{
        type: String,
        require: [true, "Please input username"]
    },
    email:{
        type: String,
        require: [true, "Please input email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type: String,
        require:[true, "please input password"]
    },

},{
    timestamps: true
})

module.exports = mongoos.model("User",userSchema);