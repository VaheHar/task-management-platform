import mongoose from "mongoose";
import Todo from "../models/todo.js";

export const getTodos = async(req, res) => {
	try {
		const todos = await Todo.find();

		res.status(200).json(todos);
	} catch (error) {
		res.status(404).json({message: error.message})
	}
}

export const createTodo = async (req, res) => {
	const todo = req.body;

	const newTodo = new Todo(todo);

	try {
		await newTodo.save();

		res.status(201).json(newTodo)
	} catch (error) {
		res.status(409).json({message: error.message});
	}
}

export const updateTodo = async(req, res) => {
	const {id: _id} = req.params;
	const todo = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

	const updatedTodo = await Todo.findByIdAndUpdate(_id, {...todo, _id}, {new: true});

	res.json(updatedTodo);
}