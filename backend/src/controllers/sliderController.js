const ErrorHandler = require("../utils/errorhandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const Sliders = require("../model/sliderModel");
const cloudinary = require("cloudinary");

//get all slider
exports.getAllSlideShow = catchAsynchErrors(async (req, res, next) => {
  const slider = await Sliders.find();
  res.status(200).json({ success: true, slider });
});

//create slider
exports.createSlider = catchAsynchErrors(async (req, res, next) => {
  const { heading, description } = req.body;
  if (!heading || !description) {
    return next(new ErrorHandler("Please Enter Feild Input", 400));
  }
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "sliders",
    width: 150,
    crop: "scale",
  });
  const slider = await Sliders.create({
    heading,
    description,
    image: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res
    .status(200)
    .json({ success: true, message: "Create Slider SuccessFully", slider });
});

//get detail slider

exports.getDetailSlider = catchAsynchErrors(async (req, res, next) => {
  const slider = await Sliders.findById(req.params.id);
  if (!slider) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, slider });
});

//delete slider
exports.deleteSlider = catchAsynchErrors(async (req, res, next) => {
  const slider = await Sliders.findById(req.params.id);
  if (!slider) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const imageId = slider.image.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await slider.remove();
  res
    .status(200)
    .json({ success: true, message: "Delete Slider Successfully" });
});

//update slider
exports.updateSlider = catchAsynchErrors(async (req, res, next) => {
  const newSlider = { heading: req.body.heading, email: req.body.description };
  const slider = await Sliders.findById(req.params.id);
  if (!slider) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const sliderId = slider.image.public_id;
  await cloudinary.v2.uploader.destroy(sliderId);
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "sliders",
    width: 150,
    crop: "scale",
  });
  newSlider.image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };
  const sliderData = await Sliders.findByIdAndUpdate(req.params.id, newSlider, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res
    .status(200)
    .json({ success: true, message: "Update Slider Successfully", sliderData });
});
