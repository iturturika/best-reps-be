import { body } from "express-validator";

export const registerValidation = [
    body('login', 'Логин должен быть больше 4 символов').isLength({min: 4}),
    body('password', 'Пароль должен быть больше 8 символов').isLength({min: 8}),
]