import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoList from './components/TodoList';
import CreateTodo from './modals/CreateTodo';
import { getTodos } from './actions/todos'
import './App.css';

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();

	const handleModalClose = () => {
		setShowModal(false);
		setCurrentId(null);
	}

	useEffect(() => {
		dispatch(getTodos());
	}, [currentId, dispatch])

	return (
		<>
			<h3>TASK MANAGEMENT PLATFORM</h3>
			<div className='main-container'>
				<div className='modal-container'>
					<button className='btn-outline-secondary' onClick={() => setShowModal(true)}>Add task</button>
					<CreateTodo show={showModal} setShowModal={setShowModal} handleClose={handleModalClose} currentId={currentId} />
				</div>
				<div className='todos-container'>
					<TodoList status="todo" name="To do" setCurrentId={setCurrentId} />
					<TodoList status="doing" name="Doing" setCurrentId={setCurrentId} />
					<TodoList status="done" name="Done" setCurrentId={setCurrentId} />
				</div>
			</div>
		</>

	)
}

export default App;