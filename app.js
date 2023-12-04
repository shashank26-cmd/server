import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRoutes from './routes/user.route.js'


config();
const app=express();
app.use(express.json()); 


app.use(cors({
    origin: [process.env.FRONTEND],
    credentials: true
}));


app.use('/api/v1/user',userRoutes);


app.use('/ping',function(req,res){ //testing 
    res.send("Pong");
});

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !! page not found');
});


export default app;