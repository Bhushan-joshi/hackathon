const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const err= require('./Controllers/Error')
const authRoutes= require('./Routes/authRoutes');
/**
 * TODO: add your middleware here
 */
const app = express();
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs');
app.set('views', './Views')
app.use(express.static(__dirname + '/Public/'));
app.use('/images', express.static(path.join(__dirname, 'Public/images')));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * TODO: add your Routes before get404 and get 500
 */
app.use('/',authRoutes)

// app.use(err.get404);

// app.use(err.get500);

const MONGOURL = 'mongodb://127.0.0.1:27017/test'
/**
 * TODO: add Your data base URL at MONGOURL=
 */
// mongoose.connect(MONGOURL, { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log("connected");
// });
app.listen(PORT,()=>{
    console.log(`server started at http://127.0.0.1:${PORT}`);
})