const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground.js')

// setting ejs up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// setting mongoose up
try {
    mongoose.connect('mongodb://localhost:27017/yelpcamp');
    console.log('DB CONNECTION SUCCESSFUL!');
} catch (err) {
    console.log('DB CONNECTION FAILED!');
    console.log(err);
}

app.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('home', { campgrounds });
});

app.listen(PORT, () => {
    console.log('App listening at port', PORT);
});