import mongoose from "mongoose";
//function to connect to mongodb database
export const DB_connect = async () => {
    try {
        if (!process.env.MONGO_DB_URI) {
            throw new Error("MONGO_DB_URI is not defined in the environment variables");
        }
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("database connected successfully");
    }
    catch (error) {
        throw new Error("Couldnot connect to the mongodb database");
    }
};
//function to disconnect from mongodb database
export const DB_disconnect = async () => {
    try {
        if (!process.env.MONGO_DB_URI) {
            throw new Error("MONGO_DB_URI is not defined in the environment variables");
        }
        await mongoose.disconnect();
    }
    catch (error) {
        throw new Error("Couldnot disconnect from the mongodb database");
    }
};
