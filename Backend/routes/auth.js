const express = require('express');
const User = require('../models/User.js');       // this Schema is to save the user data
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using :POST "api/auth/createuser" --> new user creation

router.post('/createuser', [
    // !validation of input data is here
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter at least a 5 character password').isLength({ min: 5 })
], async (req, res) => {
    /* 
    *we are passing user data in req.body (json)
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
    */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* this will come in if there are some errors regarding our user inputs.*/
        return res.status(400).json({ errors: errors.array() });
    }


    /* ## this will save our data to the desired collection of our choosen database.
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.json({ error: 'Please enter a valid email' })
        })       //<-- this is sending json in response
    */



    // alternate way where we are checking that whether the user with the same email already exists or not here only
    try {

        //if any already existing user in our database would be having the same email then user=NULL else user=that document or record
        let user = await User.findOne({ email: req.body.email });
        // NULL= false & any other thing = true

        if (user) {
            return res.status(400).json({ errors: "sorry user with the same email already exists" });
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })

        res.json({ "result": "successful" })
    } catch (error) {

        console.log(error);
        res.status(500).send("some error occured")
    }

})

module.exports = router

// ! purpose=> on hitting '/api/auth' 