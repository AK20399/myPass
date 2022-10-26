import { ObjectId } from "mongoose";

export interface UserDataType {
    _id:string|ObjectId,
    username:string,
    email:string,
    profilePicture:string,
    googleToken:string,
    mfaSecret:string
}