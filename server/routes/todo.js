import express from 'express';

import {getTodos, createTodo, updateTodo} from '../controllers/todo.js'

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodo);

export default router;