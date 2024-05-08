require("express-async-errors");
const express = require('express');
const app = express();
app.use(express.json());

process.on("unhandledRejection", ex => {
    throw ex;
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})
require('./src/start/routes')(app);
require('./src/start/db')();


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})