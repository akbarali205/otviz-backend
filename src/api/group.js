const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    days: {
        type: Array,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    direction: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    start: {
        type: String,
        required: true,
        trim: true
    },
    pupils: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pupil"
        }]
    }
});

const Group = mongoose.model("Group", groupSchema);

// GET
router.get('/', async (req, res) => {
    const groups = await Group.find().populate('pupils', ['name', 'surname']);
    res.send(groups);
    console.log("Group-Get-All");
});

// GET ID
router.get('/:id', async (req, res) => {
    const group = await Group.findById(req.params.id).populate('pupils',  ['name', 'surname']);
    res.send(group);
    console.log("Group-Get-Id");
});

// POST
router.post('/', async (req, res) => {
    const group = await new Group({
        name: req.body.name,
        time: req.body.time,
        direction: req.body.direction,
        pupils: req.body.pupils,
        days: req.body.days
    });
    const result = await group.save();
    res.send(result);
    console.log("Group-Post", result);
});

// PUT
router.put('/:id', async (req, res) => {
    const group = await Group.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        time: req.body.time,
        direction: req.body.direction,
        pupils: req.body.pupils,
        days: req.body.days
    }, {
        new: true
    });
    res.send(group);
    console.log("Group-Put");
});

// DELETE
router.delete('/:id', async (req, res) => {
    const group = await Group.findByIdAndDelete(req.params.id);
    res.send(group);
    console.log("Group-Delete");
});

module.exports.router = router;