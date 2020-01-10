const express = require('express');
const app = express.Router();

const { auth } = require('../config/auth');

app.get("/user",auth, (req, res ) => {
    res.json({
        message: "hola"
    })
})

module.exports = app;