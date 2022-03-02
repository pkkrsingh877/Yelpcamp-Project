const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Campground = require('./models/campground.js')

// add middlewares
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

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

app.patch('/campgrounds/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, location, price, description } = req.body;
        const campground = await Campground.findByIdAndUpdate(id, {
            title, location, price, description
        }, { new: true });
        console.log(campground);
        res.redirect('/campgrounds');
    } catch (err) {
        console.log('Error in Updating...');
        console.log(err);
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

app.post('/campgrounds', async (req, res) => {
    try {
        const { title, description, location, price } = req.body;
        const campground = await Campground.create({
            title: title,
            description: description,
            location: location,
            price: price
        });
        res.render('campgrounds/show', { campground });
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
    }
});

app.get('/', async (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log('App listening at port', PORT);
});