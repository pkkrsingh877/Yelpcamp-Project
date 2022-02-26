const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

// setting ejs up
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log('App listening at port', PORT);
});