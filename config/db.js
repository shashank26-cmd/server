import mongoose from "mongoose";

// Disable strict query mode for MongoDB 
mongoose.set('strictQuery', false);

const connectionToDB = async () => {
    try {
        // Attempt to connect to the MongoDB database
        const { connection } = await mongoose.connect(
            process.env.MONGODB_URL
        );

        // Check if the connection was successful
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.host}`);
        }
    } catch (e) {
        // Log any errors that occur during the connection attempt
        console.log(e);
        // Exit the process with a non-zero status code to indicate failure
        process.exit(1);
    }
};

export default connectionToDB;
