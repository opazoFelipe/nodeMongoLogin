const express = require('express');
const router = express.Router();
// const passport = require('passport');

router.get('/profile', (req, res, next)=>{
    res.render('profile');
});

module.exports = router;