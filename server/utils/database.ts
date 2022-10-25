import mongoose from 'mongoose'

export const connectDB = async ()=>{
    if(process.env.MONGODB_URL)
        await mongoose.connect(process.env.MONGODB_URL);

    mongoose.connection.on('error',()=>{
        console.log("Mongodb connection error")
    })
}