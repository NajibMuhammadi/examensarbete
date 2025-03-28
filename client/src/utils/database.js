import mongoose from "mongoose";
export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "user",
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection failed");
    }
}