const ErrorHandler = require("../utils/errorhandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const Sliders = require("../model/sliderModel");

//get all slider
exports.getAllSlideShow = catchAsynchErrors(async (req, res, next) => {
  const slider = await Sliders.find();
  res.status(200).json({ success: true, slider });
});

//create slider
exports.createSlider = catchAsynchErrors(async (req, res, next) => {
  const { heading, description, image } = req.body;
  if (!heading || !description) {
    return next(new ErrorHandler("Please Enter Feild Input", 400));
  }
  const slider = await Sliders.create({
    heading,
    description,
    image: {
      public_id: image.public_id,
      url: image.url,
    },
  });

  res
    .status(200)
    .json({ success: true, message: "Create Slider SuccessFully", slider });
});

//delete slider

exports.deleteSlider = catchAsynchErrors(async (req, res, next) => {
  let slider = await Product.findById(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Delete Slider Successfully" });
});

//update slider
exports.updateSlider = catchAsynchErrors(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "Update Slider Successfully" });
});
