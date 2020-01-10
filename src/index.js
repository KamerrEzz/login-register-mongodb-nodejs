const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');

// --== --==
const app = express();
require('./config/passport')
require('./db');

// --== settings ==--
app
.set('port', process.env.PORT || 3000)
.set('views', path.join(__dirname, 'views'))
.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
.set('view engine', '.hbs')

// --== middlewares ==--
.use(express.urlencoded({extended: false}))
.use(methodOverride('_method'))
.use(session({
    secret: "kamerrsito",
    resave: true,
    saveUninitialized: true
}))
.use(passport.initialize())
.use(passport.session())
.use(flash())
// --== global ==--
.use((req, res , next) => {
    res.locals.error = req.flash('error');
    next();
})
// --== routes ==--
.use(require('./routes/routes'))

// --== static files ==--
.use(express.static(path.join(__dirname, 'public')))

.listen(app.get('port'), () => {
    console.log("Server listo en ", app.get('port'));
    
})