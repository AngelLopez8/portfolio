const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', async (req, res) => {
    
    const projects = loadProjects();
    
    res.render('home.ejs', { pageTitle: "Home", projects});   
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

app.get('/:id', (req, res) => {
    const project = loadProjects().filter( (proj) => {
        return proj.project === req.params.id;
    })[0];
    res.render('project.ejs', { pageTitle: project.project, project });
});

app.get('*', (req, res) => {
    res.render('404.ejs', { pageTitle: req.params[0].slice(1)});
})

app.listen(port, (req, res) => {
    console.log("Listening on port: " + port);
});

/* read functions */

const loadProjects = () => {
    try{
        const dataBuffer = fs.readFileSync('projects.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e){
        return [];
    }
};