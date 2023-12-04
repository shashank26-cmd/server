import cloudinary  from 'cloudinary';

import app from './app.js';
import connectionToDB from './config/db.js';
import {config} from 'dotenv'

config();

const PORT = process.env.PORT || 5002;

cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name, 
  api_key: process.env.Cloud_Key, 
  api_secret:process.env.Cloud_Secret

  
});


app.listen(PORT, async () => {
  try {
    await connectionToDB();
    console.log(`App is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});
