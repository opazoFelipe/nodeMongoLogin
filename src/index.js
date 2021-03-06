const express = require('express');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const path = require('path');
const routes = require('./routes/index');

// Initializations
const app = express();
require('./database');
require('./passport/local-auth');

// settings
app.set('port', process.env.PORT || 3000);
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
// Permite al servidor recibir datos desde el cliente (formularios...), pero con extended: false impide recibir otro tipo de datos 
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//middleware propio
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});

// routes
app.use(routes.indexRoute);
app.use(routes.signin);
app.use(routes.signup);
app.use(routes.profile);

// global variables

// starting the server
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// Minuto del video 01:50:00