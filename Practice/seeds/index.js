const mongoose = require('mongoose');
const path = require('path');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20) + 10;
        const camp = new Campground({
            author: '675546c514612c488c09660d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Newjeans is the gookhip one top',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dnddbimcv/image/upload/v1733902200/YelpCamp/ijotdgccefp9ak1mzw8w.webp',
                  filename: 'YelpCamp/ijotdgccefp9ak1mzw8w',
                },
                {
                  url: 'https://res.cloudinary.com/dnddbimcv/image/upload/v1733902201/YelpCamp/p1acmtbld18c3syaj6xk.jpg',
                  filename: 'YelpCamp/p1acmtbld18c3syaj6xk',
                }
              ]
        })
        await camp.save();
    }
}
 
seedDB().then(() =>{
    mongoose.connection.close();
});