require("express-async-errors");
const express = require('express');
const app = express();
app.use(express.json());

process.on("unhandledRejection", ex => {
    throw ex;
});

app.get('/', (req, res) => {
    if(!req.headers.salom) {
        return res.status(401).send("Blya davay");
    }
    if(req.headers.salom === "hello world") {
        return res.status(200).send("Davayti");
    } else {
        return res.status(401).send({message: "Axti suka"});
    }
})
require('./src/start/routes')(app);
require('./src/start/db')();


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})