const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const lidSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    born: {
        type: String,
        required: true,
        trim: true
    },
    pNumber: {
        type: String,
        required: true,
        trim: true
    },
    parentsNumber: {
        type: String,
        required: true,
        trim: true
    },
    sub: {
        type: String,
        required: true,
        trim: true
    },
    free: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true,
        trim: true
    }
    
})

const Lid = mongoose.model('Lid', lidSchema);

// get
router.get('/', async (req, res) => {
    const lid = await Lid.find({});
    res.send(lid);
    console.log("Lid-Get-All");
});

// get ID
router.get('/:id', async (req, res) => {
    const lid = await Lid.findById(req.params.id);
    res.send(lid);
    console.log("Lid-Get-Id");
})

// post
router.post('/', async (req, res) => {
    const lid = new Lid({
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        born: req.body.born,
        pNumber: req.body.pNumber,
        parentsNumber: req.body.parentsNumber,
        sub: req.body.sub,
        free: req.body.free,
        about: req.body.about
    });
    const result = await lid.save();
    res.send(result);
    console.log("Lid-Post");
});

// delete 
router.delete('/:id', async (req, res) => {
    const lid = await Lid.findByIdAndDelete(req.params.id);
    res.send(lid);
    console.log("Lid-Delete");
});

// put
router.put('/:id', async (req, res) => {
    const lid = await Lid.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address,
        born: req.body.born,
        pNumber: req.body.pNumber,
        parentsNumber: req.body.parentsNumber,
        sub: req.body.sub,
        free: req.body.free
    }, {
        new: true
    });
    res.send(lid);
    console.log("Lid-Put");
});

module.exports.lid = Lid;
module.exports.router = router;