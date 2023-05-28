const { Router } = require('express');
const authController = require('../controllers/user.auth.controller');
const verifySignUp = require('../middlewares/verify.signup.middleware');
const app = Router();

app.post('/signup', [verifySignUp.verifyDuplicateEmail], authController.signUp);

app.post('/login', authController.logIn);

module.exports = app;
