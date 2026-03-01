const mongoose = require('mongoose');

//TaskSchema Structure
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: {
        type: String,
        enum: ["Todo", "In Progress", "Completed"],
        default: "Todo"
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);