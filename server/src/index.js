import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { accountRouter } from './routes/AccountRoute.js';
import { contactRouter } from './routes/ContactRoute.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', accountRouter); 
app.use('/contacts', contactRouter);

mongoose.connect("mongodb+srv://tranlanvy1203:contactPassword@contactsdb.yv6dsiw.mongodb.net/contactsDB?retryWrites=true&w=majority")

app.listen(3001, () => console.log('Server runs successfully'));