import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

// allow app to use environment variables
import dotenv from 'dotenv';
import { authRouter } from './Routes/authRoute';
import { initializeTypeORM } from './Connections/typeORM';
dotenv.config();

initializeTypeORM();

const app: Express = express();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(express.json());

app.use('/auth', authRouter);

app.get('/', (req, res) => {
	res.json({ message: 'API is working' });
});

export default app;
