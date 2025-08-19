"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('./app');
const mongoose = require('mongoose');
const { Server } = require('http');
let server;
const main = async () => {
    try {
        // await mongoose.connect("") 
        // .then(() => {
        //     console.log("Connected to MongoDB");
        // })
        // .catch((error : any) => {
        //     console.error("Error connecting to MongoDB:", error);
        // });
        server = app.listen(5555, () => {
            console.log(`Server is running on port {5555}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();
//# sourceMappingURL=server.js.map