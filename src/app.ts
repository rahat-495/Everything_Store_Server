
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser' ;
import router from './app/routes';

const app = express() ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true , origin : "http://localhost:3000"}));

app.use("/api/v1" ,router) ;

app.get('/' , (req , res) => {
    res.send("Everything store server is running !") ;
})

export default app ;
