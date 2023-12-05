import cloudinary from 'cloudinary';

import app from './app.js';
import connectionToDB from './config/db.js';

import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 5002;

// Configure Cloudinary with API credentials 
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Key,
    api_secret: process.env.Cloud_Secret
});

// Start the server and listen on the specified port
app.listen(PORT, async () => {
    try {
        // Attempt to establish a connection to the MongoDB database
        await connectionToDB();
        
        // Log a success message if the server is running and the database connection is successful
        console.log(`App is running at http://localhost:${PORT}`);
    } catch (error) {
        // Log an error message if there is a problem connecting to the database
        console.error('Error connecting to the database:', error);
    }
});
