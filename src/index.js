import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import Task from "./models/Task.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`server dang chay tai Port:${PORT}`)
    }).catch(error => {
        console.log(`Loi ket nối cơ sở dữ liệu: ${error}`)
    });






app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});