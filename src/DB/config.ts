import mongoose from "mongoose";

export const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("mongoose connect")
    }
    catch (error) {
        console.log("mongodb connection error", error)
        process.exit(1)
    }
}