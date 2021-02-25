const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { json } = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri,
     { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(cors());
app.use(express.static('public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let Project = require('./models/project.model');

app.get('/', async (req, res) => {
    await Project.find()
        .then( projects => {
            res.render('home.ejs', { pageTitle: "Home", projects});
        })
        .catch( err => {//res.status(400).json('Error: ' + err)}
            res.render('home.ejs', { pageTitle: "Home", projects: []});
        });    
});

app.get('/contact', (req, res) => {

    if (req.query.result){
        return res.render('contact.ejs', { pageTitle: 'Contact', result: req.query.result });
    }
    res.render('contact.ejs', { pageTitle: 'Contact', result: null });
});

app.post('/contact', (req, res) => {
    res.redirect('/contact?result=true');
});

app.get('*', (req, res) => {
    res.render('404.ejs', { pageTitle: req.params[0].slice(1)});
})

app.listen(port, (req, res) => {
    console.log("Listening on port: " + port);
});