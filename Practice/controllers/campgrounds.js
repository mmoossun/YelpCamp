const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


module.exports.index = async (req, res) =>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
}
module.exports.renderNewFrom = (req,res)=>{
    res.render('campgrounds/new');
}

module.exports.createCampground = async(req, res, next)=>{
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const features = geoData.features[0];
    const geometry = features && features.length > 0 ? geoData.features[0].geometry : { type: 'Point', coordinates: [0, 0] };

    const campground = new Campground(req.body.campground);
    // campground.geometry = geoData.body.features[0].geometry;
    campground.geometry = geometry; // 기본값 또는 유효한 geometry 할당
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.author = req.user._id;
    console.log(campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async(req, res)=>{
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    console.log(campground);
    if(!campground){
        req.flash('error','존재하지 않는 캠핑장이에요 ):');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{campground});
}

module.exports.renderEditFrom = async (req, res)=> {
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error','존재하지 않는 캠핑장이에요 ):');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit',{campground});
}

module.exports.updateCampground = async(req , res)=>{
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const features = geoData.body?.features;
    if (features && features.length > 0) {
        campground.geometry = geoData.features[0].geometry;
    }
    campground.geometry = geoData.features[0].geometry;
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
        console.log(campground);
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteCampground = async (req,res)=>{
    const { id } = req.params;
    const campground = await Campground.findById(id);
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Deleted!');
    res.redirect('/campgrounds');
}