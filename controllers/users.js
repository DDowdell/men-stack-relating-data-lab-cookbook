const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// router logic========================================
router.get('/', async (req, res) => {
    try {
        const users = await User.find(req.params.username);
        res.render('users/index.ejs', {
            testUsers: users
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.send('User not found');
        }
        res.render('users/show.ejs', {
            allUsers: user
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});




module.exports = router;

