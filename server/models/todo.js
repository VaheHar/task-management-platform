import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	status: {type: String, required: true},
	priority: {type: String, required: true}
})

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;