//require('dotenv').config();
const express = require('express');
const app = express();
require('./model/db-config');
const PostModel = require('./model/user');

app.listen(8080, (err) => {
    !err ? console.log(`server starting`) : console.log(`error server: ${err}`)
})


app.get('/', (req, res) => {
    //le header
    res.setHeader('Content-Type', 'text/html');

    //le corps
    res.status(200).send(PostModel.find());
})

app.post('/', (req, res) => {

})

app.put('/', (req, res) => {

})

app.delete('/', (req, res) => {

}) 