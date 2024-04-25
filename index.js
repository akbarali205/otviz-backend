const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const winston = require("winston");
require("express-async-errors");

app.use(function (err, req, res, next) {
	winston.error(err.message, err);
	res.status(500).send("Serverda kutilmagan xato ro'y berdi");
});
winston.add(new winston.transports.Console());

const rating = require('./src/rating');
app.use(express.json());
app.use(cors());
app.use('/teacher', rating);

mongoose.connect('mongodb+srv://akbarali:akbarali2206@cluster0.1t6ltwf.mongodb.net/educrm?retryWrites=true&w=majority')
    .then(() => {
         console.log('Mongodbga muvaffiqyatli ulanildi...');
    })
    .catch((err) => {
         console.log('Mongobga ulanishda qandaydir hgatolik yuz berddi!', err);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})