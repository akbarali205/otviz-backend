const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const doctor = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    rating: {
        num: {
            type: Number,
            required: true,
            trim: true
        },
        stars: {
            type: Number,
            required: true,
            trim: true
        }
    },
    job: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    skill: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 1000
    },
    image: {
        type: String,
        trim: true
    }
});

const Doctor = mongoose.model('Doctor', doctor);

router.post('/', async (req, res) => {
    const doctor = new Doctor({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        rating: {
            num: req.body.rating.num,
            stars: req.body.rating.stars
        },
        job: req.body.job,
        skill: req.body.skill
    });
    await doctor.save();
    res.json(doctor);
});

router.put('/rating', async (req, res) => {
    const doctor1 = await Doctor.findById(req.body.id);
    const doctor = await Doctor.findByIdAndUpdate(req.body.id, { rating: {
        num: doctor1.rating.num + 1,
        stars: doctor1.rating.stars + req.body.stars
    } });
    console.log(doctor);
    res.send(doctor);
});
router.get('/', async (req, res) => {
    const doctor = await Doctor.find({}).sort({ skill: 1 });
    console.log(doctor);
    res.json(doctor);
});

router.get('/:id', async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    console.log(doctor);
    res.json(doctor);
});

// async function setDoc() {
    // const doctor = new Doctor({
    //     firstName: 'Akbarali',
    //     lastName: 'Sobirov',
    //     rating: {
    //         num: 2,  
    //         stars: 10
    //     },
    //     job: 'Fullstack developer',
    //     skill: '5 yil'
    // });
//     await doctor.save();
//     console.log(doctor);
// }
// setDoc();

module.exports = router;