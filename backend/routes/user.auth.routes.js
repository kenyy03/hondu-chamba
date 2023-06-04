const { Router } = require('express');
const authController = require('../controllers/user.auth.controller');
const verifySignUp = require('../middlewares/verify.signup.middleware');
const verifyJwt = require('../middlewares/verify.jwt.middleware');
const app = Router();

app.post('/signup', [verifySignUp.verifyDuplicateEmail], authController.signUp);

app.post('/login', authController.logIn);

app.get('/user-by-id', [verifyJwt.veryfyToken], authController.getUserById);

app.put('/update-user', [verifyJwt.veryfyToken], authController.updateUser);

module.exports = app;
