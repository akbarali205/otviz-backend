const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const doctor = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    fistName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    certificate: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        num: {
            type: Number,
            trim: true,
            default: 0
        },
        stars: {
            type: Number,
            trim: true,
            default: 0
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
    },
    certificate: {
        type: Number,
        required: true,
        trim: true
    },
    success: {
        type: Number,
        required: true,
        trim: true
    },
    pupils: {
        all: {
            type: Number,
            trim: true,
        },
        success: {
            type: Number,
            trim: true
        },
        english: {
            cefr_b1: {
                type: Number,
                trim: true,
                default: 0
            },
            cefr_b2: {
                type: Number,
                trim: true,
                default: 0
            },
            cefr_c1: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_5_5: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_6: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_6_5: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_7: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_7_5: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_8: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_8_5: {
                type: Number,
                trim: true,
                default: 0
            },
            ielts_9: {
                type: Number,
                trim: true,
                default: 0
            },
            isEntered: {
                type: Number,
                trim: true,
                default: 0
            }
        },
        otherSubject: {
            cefr_b1: {
                type: Number,
                trim: true,
                default: 0
            },
            cefr_b2: {
                type: Number,
                trim: true,
                default: 0
            },
            cefr_c1: {
                type: Number,
                trim: true,
                default: 0
            },
            isEntered: {
                type: Number,
                trim: true,
                default: 0
            }
        }
    }
});

const Doctor = mongoose.model('Doctor', doctor);

router.post('/', async (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        firsName: req.body.firsName,
        rating: {
            num: 0,
            stars: 0
        },
        job: req.body.job,
        skill: req.body.skill,
        image: req.body.image,
        certificate: req.body.certificate,
        pupils: {
            all: Number(req.body.pupil),
            success: 0,
            english: {
                cefr_b1: Number(req.body.eng_cefr_b1),
                cefr_b2: Number(req.body.eng_cefr_b2),
                cefr_c1: Number(req.body.eng_cefr_c1),
                ielts_5_5: Number(req.body.eng_ielts_5_5),
                ielts_6: Number(req.body.eng_ielts_6),
                ielts_6_5: Number(req.body.eng_ielts_6_5),
                ielts_7: Number(req.body.eng_ielts_7),
                ielts_7_5: Number(req.body.eng_ielts_7_5),
                ielts_8: Number(req.body.eng_ielts_8),
                ielts_8_5: Number(req.body.eng_ielts_8_5),
                ielts_9: Number(req.body.eng_ielts_9),
                isEntered: Number(req.body.eng_successful)
            },
            otherSubject: {
                cefr_b1: Number(req.body.oth_cefr_b1),
                cefr_b2: Number(req.body.oth_cefr_b2),
                cefr_c1: Number(req.body.oth_cefr_c1),
                isEntered: Number(req.body.successful)
            }
        }
    });
    await doctor.save();
    res.json(doctor);
});

router.put('/rating', async (req, res) => {
    const doctor1 = await Doctor.findById(req.body.id);
    const doctor = await Doctor.findByIdAndUpdate(req.body.id, {
        rating: {
            num: doctor1.rating.num + 1,
            stars: doctor1.rating.stars + req.body.stars
        }
    });
    console.log(doctor);
    res.send(doctor);
});
router.get('/', async (req, res) => {
    const doctor = await Doctor.find({});
    console.log(doctor);
    res.json(doctor);
});

router.get('/:id', async (req, res) => {
    const doctor = await Doctor.findById(req.params.id);
    console.log(doctor);
    res.json(doctor);
});

const post = {
    certificate: "cefr_c2 ielts_9",
    eng_cefr_b1: "10",
    eng_cefr_b2: "10",
    eng_cefr_c1: "10",
    eng_cefr_c2: "10",
    eng_ielts_5_5: "10",
    eng_ielts_6: "10",
    eng_ielts_6_5: "10",
    eng_ielts_7: "10",
    eng_ielts_7_5: "10",
    eng_ielts_8: "10",
    eng_ielts_8_5: "13",
    eng_ielts_9: "11",
    firstName: "Muminov",
    job: "english",
    name: "Baxtiyor",
    pupil: "10",
    skill: "5yil+",
    successful: "35",

    oth_cefr_b1: "10",
    oth_cefr_b2: "10",
    oth_cefr_c1: "10"
}

module.exports = router;