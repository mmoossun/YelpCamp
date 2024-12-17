const express = require('express');
const router = express.Router();
const User = require('../models/user');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post( catchAsync(users.register))
router.route('/login')
    .get( users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}),users.login)

// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));

// router.get('/login', users.renderLogin)
// router.post('/login',storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}),users.login)

router.get('/logout', users.logout); 
module.exports = router;