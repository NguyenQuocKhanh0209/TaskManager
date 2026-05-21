import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import taskRouter from "./routers/taskRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRouter)

const PORT = process.env.PORT || 3000;

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log(`server dang chay tai Port:${PORT}`)
    }).catch(error => {
        console.log(`Loi ket nối cơ sở dữ liệu: ${error}`)
    });

app.post('/api/createTasks',)




app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});