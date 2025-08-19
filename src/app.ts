
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser' ;

const app = express() ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true , origin : "http://localhost:3000"}));

app.get('/' , (req , res) => {
    res.send("Everything store server is running !") ;
})

export default app ;
