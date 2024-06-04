const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const lids = require('./lid').lid;

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Group"
    },
    date: {
        davomat: {
            type: [{
                date: {
                    type: String,
                    required: true
                },
                status: {
                    type: String,
                    required: true
                }
            }]
        },
        pay: {
            type: [{
                month: {
                    type: String,
                    required: true
                },
                status: {
                    type: Boolean,
                    required: true
                }
            }]
        }
    }

});

const pupilSchema = mongoose.Schema({
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
    subjects: {
        type: [subSchema],
        required: true,
        trim: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: "Teacher"
    }
});

const Pupil = mongoose.model('Pupil', pupilSchema);

// GET
router.get('/', async (req, res) => {
    const pupils = await Pupil.find().populate('teacher');
    res.send(pupils);
    console.log("Pupil-Get-All");
});

// GET ID
router.get('/:id', async (req, res) => {
    const pupils = await Pupil.findById(req.params.id).populate('teacher');
    res.send(pupils);
    console.log("Pupil-Get-Id");
});

// POST
router.post('/', async (req, res) => {
    const pupil = new Pupil({
        name: req.body.name,
        surname: req.body.surname,
        subjects: {
            name: req.body.subjects.name,
            group: req.body.subjects.group
        },
        teacher: req.body.teacher,
        group: req.body.group,
        address: req.body.address,
        born: req.body.born,
        pNumber: req.body.pNumber,
        parentsNumber: req.body.parentsNumber
    });
    const result = await pupil.save();
    if (!result) {
        return res.status(500).send("Serverda kutilmagan xato ro'y berdi");
    };
    res.send(result);
    console.log("Pupil-Post", pupil);
});

// PUT

router.put('/:id', async (req, res) => {
    const result = await Pupil.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        surname: req.body.surname,
        teacher: req.body.teacher,
        group: req.body.group,
        address: req.body.address,
        born: req.body.born,
        pNumber: req.body.pNumber,
        parentsNumber: req.body.parentsNumber
    });
    if (!result) {
        return res.status(500).send("Serverda kutilmagan xato ro'y berdi");
    };
    res.send(result);
    console.log("Pupil-Put", result);
});

// DELETE

router.delete('/:id', async (req, res) => {
    const result = await Pupil.findByIdAndDelete( req.params.id );
    if (!result) {
        return res.status(500).send("Serverda kutilmagan xato ro'y berdi");
    };
    res.send(result);
    console.log("Pupil-Delete", result);
});


// DATE
router.put('/date/:id', async (req, res) => {
    const result = await Pupil.findOneAndUpdate(
        { _id: req.params.id, 'subjects.name': req.body.name },
        { $push: { 'subjects.$.date.davomat': req.body.date } },
        { new: true, runValidators: true }
      );
    if (!result) {
        return res.status(500).send("Serverda kutilmagan xato ro'y berdi", result);
    };
    res.send(result);
    console.log("Pupil-Put", result);
});


module.exports.router = router;