const express = require('express');
const User = require('../models/User.js');       // this Schema is to save the user data
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'mohitsainiislearningreact';

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
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        
        // ! this is the part where we are adding user information into database
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });


        // ! JWT is simply an authentication way used to ensure a secure environment for data transfer between user and client.// this is the data that we want to sent with our webtoken and this piece of data will also be used to get user information 
        const data = {
            user: {
                id: user.id
            }
        }

        //JWT_SECRET will help us in knowing whether any user has tried to temper with  it or not.
        const authtoken = jwt.sign(data, JWT_SECRET);

        // whenever anyone would provide us with authtoken we can regain user.id from it

        res.json({ authtoken })
    } catch (error) {

        console.log(error);
        res.status(500).send("Internal server error")
    }



})

// Create a login using :POST "api/auth/login" --> login using password
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Cannot enter a blank password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* this will come in if there are some errors regarding our user inputs.*/
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials1" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "please try to login with correct credentials2" })
        }

        // below code is to provide the token
        const data = {
            user: {
                id: user.id
            }
        }

        // signing our data with our jwt sercet (security purpose)
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})

// Route 3 to get the logged in information using POST : '/api/auth/getuser  using the webtoken

/*  What are middlewares?
    Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. These functions are used to modify req and res objects for tasks like parsing request bodies, adding response headers, etc.
 */

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        // All data except the user password is getting selected here
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})


module.exports = router

// ! purpose=> on hitting '/api/auth' 