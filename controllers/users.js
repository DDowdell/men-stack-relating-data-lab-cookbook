const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// router logic========================================
router.get('/', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.render('users/index.ejs', {
            users: users
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;

