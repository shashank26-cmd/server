import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import userRoutes from './routes/user.route.js';

config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));

// Use the userRoutes for handling routes starting with '/api/v1/user'
app.use('/api/v1/user', userRoutes);

// Define a route for testing purposes ('/ping')
app.use('/ping', function (req, res) {
    res.send("Pong"); // Respond with "Pong" for testing
});

// Handle all other routes with a 404 response
app.all('*', (req, res) => {
    res.status(404).send('OOPS !! Page not found');
});

export default app;
