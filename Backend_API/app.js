const express = require('express');
const path = require('node:path');
const router = require('./routes/router');
require('dotenv').config();
const cors = require('cors');


const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true); // allow non-browser requests like Postman
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const passport = require("passport");
const jwtStrategy = require('./db/jwt')
passport.use(jwtStrategy);
app.use(passport.initialize());

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use('/', router);

PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})