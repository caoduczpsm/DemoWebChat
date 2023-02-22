const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const session = require('express-session')

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = require('./route');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(session({ secret: 'ncaoduc', resave: true, saveUninitialized: true }))

dotenv.config();

//Static file
app.use('/public', express.static(path.join(__dirname, 'resource/public')));

//Method Overrides
app.use(methodOverride('_method'));

//Template Engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../frontend', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
