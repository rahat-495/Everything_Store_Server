"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.get('/' , (req , res) => {
//     res.send("Everything store server is running !") ;
// })
module.exports = app;
//# sourceMappingURL=app.js.map