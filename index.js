import express from 'express'
import mongoose from 'mongoose';
import { registerValidation } from './validatations/auth.js';
import checkAuth from './validatations/checkAuth.js';
import { authorizeUser, registerUser } from './controllers/UserController.js';
import { addBrand, getBrands, removeBrand } from './controllers/BrandController.js';
import { addCategory, getCategories, removeCategory } from './controllers/CategoryController.js';
import { addItem, getItemById, getItems, removeItem } from './controllers/ItemController.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('DB ok');
})
.catch((err) => {
    console.log('DB err', err);
})

const corsOptions = {
    origin: process.env.FE_URL, // Укажите домен вашего сайта
    optionsSuccessStatus: 200, // некоторые браузеры (e.g., IE11) предпочитают видеть это
  };
  
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/register', registerValidation, registerUser);

app.post('/login', authorizeUser);

app.post('/brand', checkAuth, addBrand);

app.delete('/brand', checkAuth, removeBrand);

app.get('/brand', getBrands);

app.post('/category', checkAuth, addCategory);

app.delete('/category', checkAuth, removeCategory);

app.get('/category', getCategories);

app.post('/items', checkAuth, addItem);

app.delete('/items', checkAuth, removeItem);

app.get('/items', getItems);

app.get('/items/:id', getItemById);

app.listen(process.env.PORT, (err) => {

    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});