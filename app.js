const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/bookmanager');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Home Page'));
app.get('/books', (req, res) => res.send('Books List'));
app.post('/books', (req, res) => res.send('Add Book'));

app.listen(3000);
