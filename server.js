const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Campground = require('./models/campground.js');
const ejsMate = require('ejs-mate');

// add middlewares
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

// setting ejs up
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// setting mongoose up
try {
    mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
    console.log('DB CONNECTION SUCCESSFUL!');
} catch (err) {
    console.log('DB CONNECTION FAILED!');
    console.log(err);
}

app.patch('/campgrounds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, price, description, image } = req.body;
        const campground = await Campground.findByIdAndUpdate(id, {
            title, location, price, description, image
        }, { new: true });
        console.log(campground);
        res.redirect(`/campgrounds/${id}`);
    } catch (err) {
        console.log(err);
        res.end();
    }
});

app.delete('/campgrounds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        res.redirect('/campgrounds');
    } catch (err) {
        console.log('Couldn\'t delete the campground');
        console.log(err);
    }
});

app.get('/campgrounds/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        res.render('campgrounds/edit', { campground });
    } catch (err) {
        console.log(err);
    }
});

app.post('/campgrounds', async (req, res) => {
    try {
        const { title, description, location, price, image } = req.body;
        const campground = await Campground.create({
            title: title,
            description: description,
            location: location,
            price: price,
            image: image
        });
        res.redirect(`campgrounds/${campground.id}`);
    } catch (err) {
        console.log('Campground couldn\'t be added');
        console.log(err);
    }
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        res.render('campgrounds/show', { campground });
    } catch (err) {
        console.log('something went wrong');
    }
});

app.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    } catch (err) {
        console.log('Something went wrong');
        res.render(err);
    }
});

app.get('/', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('home', { campgrounds });
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT, () => {
    console.log('App listening at port', PORT);
});