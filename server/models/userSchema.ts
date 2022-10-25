import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:String,
    email:String,
    profilePicture:String,
    googleToken:String,
    mfaSecret:String
},{versionKey:false})

export default mongoose.model('user',userSchema)