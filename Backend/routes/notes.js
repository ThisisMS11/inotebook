const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// Route 1: Get all the notes using /api/notes/fetchallnotes route
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    // our middleware fetchuser has put req.user=data.user
    try {

        // this will give all the notes corresponding tothe user.id
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }

})


// Route 2: Creating the user notes using /api/notes/createnotes routes

router.post('/addnote', fetchuser, [
    // !validation of input data is here
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'entry a tag').isLength({ min: 5 })
], async (req, res) => {



    try {


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            /* this will come in if there are some errors regarding our user inputs.*/
            return res.status(400).json({ errors: errors.array() });
        }

        // this is what we call as destructuring of js element
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// Route 3: updating the user notes using /api/notes/updatenote . Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).send("Not found ");
    }
    
    //checking whether the user trying to update the note is the same as the one who created it.
    if (note.user.toString() !== req.user.id) {
        res.status(401).send("Not Allowed");
    }

    

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({note});

})



module.exports = router