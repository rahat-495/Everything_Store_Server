
import mongoose from "mongoose" ;
import { Server } from "http" ;
import app from "./app";
import config from "./app/config";

let server: Server ;
const main = async () => {

    try {
        
        await mongoose.connect(config.databaseUrl as string) 
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error : any) => {
            console.error("Error connecting to MongoDB:", error);
        });

        server = app.listen(config.port , () => {
            console.log(`Server is running on port ${config.port}`);
        })

    } catch (error) {
        console.log(error);
    }

}

main() ;
