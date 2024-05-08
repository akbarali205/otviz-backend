const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const lids = require('./lid').lid;

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    // group: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     trim: true,
    //     ref: "Group"
    // },

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
    // subjects: {
    //     type: [subSchema],
    //     required: true
    // }
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
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
    const lid = await lids.findById(req.body.id); 
    const pupil = new Pupil({
        name: lid.name,
        surname: lid.surname
    });
    const result = await pupil.save();
    if (!result) {
        return res.status(500).send("Serverda kutilmagan xato ro'y berdi");
    };
    res.send(result);
    console.log("Pupil-Post", pupil);
});
async function addPupil() {
    const pupil = new Pupil({
        name: "Murod",
        surname: "Murodov",
        teacher: "662a66a1bc00bd72db641eb3"
    });
    await pupil.save();
    console.log(pupil);
}
// addPupil();


module.exports.router = router;