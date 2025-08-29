
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser' ;
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app = express() ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials : true , origin : "http://localhost:3000"}));

app.use("/api/v1" ,router) ;

app.get('/' , (req , res) => {
    res.send("Everything store server is running !") ;
})

app.use(globalErrorHandler) ;
app.use(notFound) ;

export default app ;
