import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv'
import { accountRouter } from './routes/AccountRoute.js';
import { contactRouter } from './routes/ContactRoute.js';

config()
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', accountRouter);
app.use('/contacts', contactRouter);

mongoose.connect(process.env.MONGO_URL);

const port = process.env.PORT || 8001

app.listen(port, () => console.log(`Server is running on ${port}`))