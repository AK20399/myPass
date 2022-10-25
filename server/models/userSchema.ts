import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:String,
    email:String,
    profilePicture:String,
    googleToken:String,
    googleId:String
},{versionKey:false})

export default mongoose.model('user',userSchema)