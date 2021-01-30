const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const err= require('./Controllers/Error')
const authRoutes= require('./Routes/authRoutes');
const session = require('express-session');
const mongodbsession = require('connect-mongodb-session')(session);
const config=require('dotenv').config();
/**
 * TODO: add your middleware here
 */
const store = new mongodbsession({
    uri: process.env.DB_KEY,
    conllection: 'session'
});
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', './Views')
app.use(express.static(__dirname + '/Public/'));
app.use('/images', express.static(path.join(__dirname, 'Public/images')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "this is most secret thing",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

/**
 * TODO: add your Routes before get404 and get 500
 */
app.use('/',authRoutes)


const MONGOURL = process.env.DB_KEY;
/**
 * TODO: add Your data base URL at MONGOURL=
 */
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected");
});
app.listen(PORT,()=>{
    console.log(`server started at http://127.0.0.1:${PORT}`);
})