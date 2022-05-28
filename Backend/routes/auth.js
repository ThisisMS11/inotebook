const express = require('express');
const User = require('../models/User.js');  // this Schema is to save the user data
const router=express.Router();

// Create a user using :POST "api/auth". Doesn't require authentication
router.post('/',(req,res) => {
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router

// ! purpose=> on hitting '/api/auth' 