import express from 'express'
import mongoose from 'mongoose';
import { registerValidation } from './validatations/auth.js';
import checkAuth from './validatations/checkAuth.js';
import { authorizeUser, registerUser } from './controllers/UserController.js';
import { addBrand, getBrands, removeBrand } from './controllers/BrandController.js';
import { addCategory, getCategories, removeCategory } from './controllers/CategoryController.js';
import { addItem, getItemById, getItems, removeItem } from './controllers/ItemController.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('DB ok');
})
.catch((err) => {
    console.log('DB err', err);
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FE_URL);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

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