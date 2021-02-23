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

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(port, (req, res) => {
    console.log("Listening on port: " + port);
});