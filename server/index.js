import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
	res.send('Works');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
	.then(() => app.listen(PORT, () => console.log('Server is up on port ' + PORT)))
	.catch((e) => console.log(e.message));