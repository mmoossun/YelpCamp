const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn,validateCampground,isAuthor} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({ storage })


const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),validateCampground ,catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'),(req,res) =>{
    //     console.log(req.body,req.files);
    //     res.send('WORKED');
    // })

router.get('/new', isLoggedIn,campgrounds.renderNewFrom);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor,catchAsync(campgrounds.deleteCampground))
// router.get('/', catchAsync(campgrounds.index));

// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

//router.get('/:id', catchAsync(campgrounds.showCampground));

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditFrom));

//router.put('/:id',isLoggedIn,isAuthor,validateCampground, catchAsync(campgrounds.updateCampground));

//router.delete('/:id',isLoggedIn, isAuthor,catchAsync(campgrounds.deleteCampground));

module.exports = router;