import Task from "../models/Task.js";

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task)
        console.log("Da tao task thanh cong!!!");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
        console.log(`Loi ${error} khi tao task!!!`)
    }
}

const getAllTask = async (req, res) => {
    try {
        const task = await Task.find()
        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log("Loi 500")
    }
}

export { createTask, getAllTask }