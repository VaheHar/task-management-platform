import React from 'react';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoList.css';
import  {AiOutlineEye}  from 'react-icons/ai';

const TodoList = ({ status, name, setCurrentId }) => {
	const todos = useSelector((state) => state.todos);

	return (
		<div className='container-sm'>
			<h2 className="font-weight-light">{name}</h2>
			<div className='list'>
				{
					todos.map((todo) => todo.status === status ? (
						<div className='card' key={todo._id} onClick={() => setCurrentId(todo._id)}>
							<div className='card-body'>
								<h5 className="card-title">{todo.title}</h5>
								<p className="card-text">{todo.description}</p>
								{todo.priority === 'low' && <p style={{ color: 'red' }}>Low</p>}
								{todo.priority === 'high' && <p style={{ color: 'green' }}>High</p>}
								{todo.priority === 'normal' && <p style={{ color: 'yellow' }}>Normal</p>}
								<AiOutlineEye />
							</div>
						</div>
					) : null)
				}
			</div>

		</div>
	)
}

export default TodoList