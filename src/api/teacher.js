const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    certificate: {
        type: String,
        trim: true
    },
    rating: {
        num: {
            type: Number,
            trim: true
        },
        stars: {
            type: Number,
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
    },
    certificate: {
        type: String,
        required: true,
        trim: true
    },
    pupils: {
        all: {
            type: String,
            trim: true
        },
        isEntered: {
            type: String,
            trim: true
        },
        english: {
            cefr_b1: {
                type: String,
                trim: true
            },
            cefr_b2: {
                type: String,
                trim: true
            },
            cefr_c1: {
                type: String,
                trim: true
            },
            ielts_5_5: {
                type: String,
                trim: true
            },
            ielts_6: {
                type: String,
                trim: true
            },
            ielts_6_5: {
                type: String,
                trim: true
            },
            ielts_7: {
                type: String,
                trim: true
            },
            ielts_7_5: {
                type: String,
                trim: true
            },
            ielts_8: {
                type: String,
                trim: true
            },
            ielts_8_5: {
                type: String,
                trim: true
            },
            ielts_9: {
                type: String,
                trim: true
            }
        },
        otherSubject: {
            cefr_b1: {
                type: String,
                trim: true
            },
            cefr_b2: {
                type: String,
                trim: true
            },
            cefr_c1: {
                type: String,
                trim: true
            }
        }
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

router.post('/', async (req, res) => {

    const teacher = new Teacher({
        name: req.body.name,
        firstName: req.body.firstName,
        rating: {
            num: 0,
            stars: 0
        },
        job: req.body.job,
        skill: req.body.skill,
        image: req.body.image,
        certificate: req.body.certificate,
        pupils: {
            all: req.body.pupil,
            isEntered: req.body.successful,
            english: {
                cefr_b1: req.body.eng_cefr_b1,
                cefr_b2: req.body.eng_cefr_b2,
                cefr_c1: req.body.eng_cefr_c1,
                ielts_5_5: req.body.eng_ielts_5_5,
                ielts_6: req.body.eng_ielts_6,
                ielts_6_5: req.body.eng_ielts_6_5,
                ielts_7: req.body.eng_ielts_7,
                ielts_7_5: req.body.eng_ielts_7_5,
                ielts_8: req.body.eng_ielts_8,
                ielts_8_5: req.body.eng_ielts_8_5,
                ielts_9: req.body.eng_ielts_9
            },
            otherSubject: {
                cefr_b1: req.body.oth_cefr_b1,
                cefr_b2: req.body.oth_cefr_b2,
                cefr_c1: req.body.oth_cefr_c1
            }
        }
    });
    await teacher.save();
    res.json(teacher);
    console.log("Post Teacher", teacher);
});

router.put('/rating', async (req, res) => {
    const teacher1 = await Teacher.findById(req.body.id);
    const teacher = await Teacher.findByIdAndUpdate(req.body.id, {
        rating: {
            num: teacher1.rating.num + 1,
            stars: teacher1.rating.stars + req.body.stars
        }
    });
    res.send(teacher);
    console.log("Teacher rating up");
});
router.get('/', async (req, res) => {
    const teacher = await Teacher.find({});
    res.json(teacher);
    console.log("Teacher-Get-All");
});

router.get('/:id', async (req, res) => {
    const teacher = await Teacher.findById(req.params.id);
    res.json(teacher);
    console.log("Teacher-Get-Id");
});

module.exports.router = router;