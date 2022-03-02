const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

try {
    mongoose.connect('mongodb://localhost:27017/yelpcamp');
    console.log('Database Connected!');
} catch (err) {
    console.log('Database Connection Failed!');
    console.log(err);
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const random25 = Math.floor(Math.random() * 25);
        const camp = new Campground({
            location: `${cities[random25].city}, ${cities[random25].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            price: 100,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. At modi sit asperiores, dicta distinctio maiores nulla soluta quos deleniti voluptatibus ut temporibus iusto. Optio odio mollitia eos pariatur repellat accusantium.'
        })
        console.log(`${i + 1}. ${cities[random25].city}, ${cities[random25].state}`);
        await camp.save();
    }
}

seedDB();