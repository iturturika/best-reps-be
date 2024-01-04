import express from 'express'
import mongoose from 'mongoose';
import { registerValidation } from './validatations/auth.js';
import checkAuth from './validatations/checkAuth.js';
import { authorizeUser, registerUser } from './controllers/UserController.js';
import { addBrand, removeBrand } from './controllers/BrandController.js';
import { addCategory, removeCategory } from './controllers/CategoryController.js';
import { addItem, getItemById, getItems, removeItem } from './controllers/ItemController.js';

const app = express();

mongoose.connect('mongodb+srv://ilia:12345@cluster0.sq3lurj.mongodb.net/best-reps-db')
.then(() => {
    console.log('DB ok');
})
.catch((err) => {
    console.log('DB err', err);
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/register', registerValidation, registerUser);

app.post('/login', authorizeUser);

app.post('/brand', checkAuth, addBrand);

app.delete('/brand', checkAuth, removeBrand);

app.post('/category', checkAuth, addCategory);

app.delete('/category', checkAuth, removeCategory);

app.post('/items', checkAuth, addItem);

app.delete('/items', checkAuth, removeItem);

app.get('/items', getItems);

app.get('/items/:id', getItemById);

app.listen(8080, (err) => {

    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});