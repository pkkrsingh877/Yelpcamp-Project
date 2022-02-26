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

app.get('/makecampground', async (req, res) => {
    const campground = new Campground({
        title: 'Area 27 Stage 3',
        price: '23',
        description: 'Fight against picoolo, and get a chance to fight against Launch and Emperor Pilaf. You can get lots of green gems.',
        location: 'Area 27 Stage 3'
    });
    await campground.save();
    res.send(campground);
});

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log('App listening at port', PORT);
});