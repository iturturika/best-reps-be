import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            login: req.body.login,
            password: passwordHash
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'best-reps-be')
    
        res.json({
            ...user._doc,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегестрироваться!'
        })
    }
}

export const authorizeUser = async (req, res) => {
    try{
        const user  = await UserModel.findOne({login: req.body.login});

        if(!user) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }
        
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

        if(!isValidPass){
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'best-reps-be')
        
        res.json({
            ...user._doc,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось авторизоваться!'
        })
    }
}