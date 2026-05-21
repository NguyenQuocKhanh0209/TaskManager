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
        console.log("Lay tat ca task thanh cong!")

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(`Loi ${error} khi lay tat ca task!`)
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOne({ _id: id });
        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.status(200).json(task)
        console.log(`Da lay task ${task}`)

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(`Loi ${error}`)
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findOneAndDelete({ _id: id })
        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.status(200).json(task)
        console.log("Da xoa thanh cong task")
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(`Loi server ${error} 500 khi xoa task`)
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).json({ error: "Task not found" })
        }
        res.status(200).json(task)
        console.log(`Da cap nhat thanh cong task ${task}`)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
        console.log(`Loi ${error} khi cap nhat task`)
    }
}


export { createTask, getAllTask, getTask, deleteTask, updateTask }