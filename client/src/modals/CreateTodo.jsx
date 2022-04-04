import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createTodo, updateTodo } from '../actions/todos'

const CreateTodo = ({ show, handleClose, currentId, setShowModal }) => {
	const [todoData, setTodoData] = useState({ title: '', description: '', status: 'todo', priority: 'high' });
	const [missingField, setMissingField] = useState(false);
	const todo = useSelector((state) => currentId ? state.todos.find((todo) => todo._id === currentId) : null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (todo) {
			setTodoData(todo);
			setShowModal(true);
		}
	}, [currentId, setShowModal])

	const handleSubmit = () => {
		if (!todoData.title || !todoData.description) {
			setMissingField(true);
		} else if (currentId) {
			dispatch(updateTodo(currentId, todoData));
			clear();
		} else {
			dispatch(createTodo(todoData));
			clear();
		}
	}

	const clear = () => {
		setMissingField(false);
		handleClose();
		setTodoData({ title: '', description: '', status: 'todo', priority: 'high' });
	}

	return (
		<Modal show={show} onHide={clear}>
			<Modal.Header closeButton>
				<Modal.Title>Create Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<div className='form-group'>
						<label>Title</label>
						<input type="text" required className='form-control' value={todoData.title} onChange={(e) => setTodoData({ ...todoData, title: e.target.value })} />
					</div>
					<div className='form-group'>
						<label>Description</label>
						<textarea required rows="5" className='form-control' value={todoData.description} onChange={(e) => setTodoData({ ...todoData, description: e.target.value })}></textarea>
					</div>
					<div className='form-group'>
						<label>Select Priority</label>
						<select className='form-control form-select' value={todoData.priority} onChange={(e) => setTodoData({ ...todoData, priority: e.target.value })}>
							<option value="high">High</option>
							<option value="normal">Normal</option>
							<option value="low">Low</option>
						</select>
					</div>
					<div className='form-group'>
						<label>Select Status</label>
						<select className='form-control form-select' value={todoData.status} onChange={(e) => setTodoData({ ...todoData, status: e.target.value })}>
							<option value="todo">Todo</option>
							<option value="doing">Doing</option>
							<option value="done">Done</option>
						</select>
					</div>
					{
						missingField && (
							<div className="alert alert-primary d-flex align-items-center" role="alert">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
									<path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
								</svg>
								<div>
									Missing fields
								</div>
							</div>
						)
					}
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={clear}>
					Close
				</Button>
				<Button variant="primary" onClick={handleSubmit}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CreateTodo;