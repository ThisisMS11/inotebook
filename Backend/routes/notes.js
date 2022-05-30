const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');

// Route 1: Get all the notes using /api/notes/fetchallnotes route
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    // our middleware fetchuser has put req.user=data.user
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})


// Route 1: Creating the user notes using /api/notes/createnotes routes

router.post('/createnotes',fetchuser, async (req, res) => {
    //let user = await User.findOne({ email: req.body.email });

    //---->>>>>>>>>>>>>>>>>>>>>>>>>>> User is the collection name out here
    // user = await User.create({
    //     name: req.body.name,
    //     password: secPass,
    //     email: req.body.email
    // });

    // i am getting req.user=data.user


    console.log(req.body.title)
    res.json(req.body)
})



module.exports = router