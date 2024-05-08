const winston = require("winston");
winston.add(new winston.transports.Console());
const cors = require("cors");
const lids = require('../api/lid').router;
const pupils = require('../api/pupil').router;
const teacher = require('../api/teacher').router;


module.exports = function (app) {
    app.use(function (err, req, res, next) {
        winston.error(err.message, err);
        res.status(500).send("Serverda kutilmagan xato ro'y berdi");
    });
    app.use(cors());
    app.use('/teachers', teacher);
    app.use("/lids", lids);
    app.use("/pupils", pupils);
}