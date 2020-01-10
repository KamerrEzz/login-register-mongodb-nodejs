const express = require('express');
const app = express.Router();

app.use(require('./index'))
app.use(require('./user'))

module.exports = app;