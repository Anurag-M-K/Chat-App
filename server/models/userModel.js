const mongoose = require("mongoose");

const UserSchema = new mongoose .Schema({
    username:{
        type :String,
        required :true,
        min :3,
        max : 30,
        unique : true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password :{
        type:String,
        required:true,
        min : 8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    AvatarImage : {
        type:String,
        default:"",

    },
});

module.exports = mongoose.model("Users",UserSchema)