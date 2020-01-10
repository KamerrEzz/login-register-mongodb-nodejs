const express = require('express');
const app = express.Router();
const passport = require('passport')

const User = require('../models/user');

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render('users/login')
})
app.get('/singup', (req, res) => {
    res.render('users/singup')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
}))
app.post('/singup', async (req, res) => {
    let {email,password,username} = req.body;
    const errors = [];

    if(password.length < 4){
        errors.push({text: 'Tu contraseña tiene que ser mayor a 4 letras.'})
    }

    if(errors.length > 0){
        res.render('users/singup', {
            errors,
            email,
            password,
            username
        })
    } else {

        let UE = await User.findOne({email: email})
        if(UE){
            errors.push({text: "Email ya registrado"})
            res.render('users/singup', {
                errors,
            })
        } else {
            const newUser = new User({email, password, username});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            res.redirect('/login')
        }
    }

})
module.exports = app;