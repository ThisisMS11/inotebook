const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// Route 1: Get all the notes using /api/notes/fetchallnotes route
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    // our middleware fetchuser has put req.user=data.user
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})


// Route 1: Creating the user notes using /api/notes/createnotes routes

router.post('/createnotes', fetchuser, [
    // !validation of input data is here
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('tag', 'entry a tag').exists(),
    body('description', 'entry a tag').isLength({ min: 5 })
], async (req, res) => {
    // let user = await User.findOne({ email: req.body.email });

    //---->>>>>>>>>>>>>>>>>>>>>>>>>>> User is the collection name out here
    // user = await User.create({
    //     name: req.body.name,
    //     password: secPass,
    //     email: req.body.email
    // });
    // i am getting req.user=data.user

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* this will come in if there are some errors regarding our user inputs.*/
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let note = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.title,
            tag: req.body.tag
        })
        console.log(req.body.title)
        res.json(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }


})



module.exports = router