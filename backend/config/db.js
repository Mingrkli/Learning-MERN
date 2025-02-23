import mongoose from "mongoose";

// Try to connect to the mongoose database, Otherwise, console the error
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // process code 1 means fail, 0 means success
    }
};
