const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

//create -- admin
exports.createProduct = catchAsynchErrors(async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res
    .status(201)
    .json({ success: true, message: "create product success", product });
});

//get all
exports.getAllProduct = catchAsynchErrors(async (req, res) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments(); //count product[]
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apifeature.query;
  let filteredProductsCount = products.length;
  apifeature.pagination(resultPerPage);
  products = await apifeature.query.clone(); // use query.clone() method when call mongoose 2nd
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

exports.getAdminProduct = catchAsynchErrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//get product detail
exports.getProductDetail = catchAsynchErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

//update --admin
exports.updateProduct = catchAsynchErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //start images
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    // delete images from cloundinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    //create new
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  res
    .status(200)
    .json({ success: true, message: "update product success", product });
});

//Delete Product --admin
exports.deleteProduct = catchAsynchErrors(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  res
    .status(200)
    .json({ success: true, message: "delete product success", product });
});

//Create review or Update the review
exports.createProductReview = catchAsynchErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  console.log(review);
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get all revew
exports.getProductReviews = catchAsynchErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete review
exports.deleteReview = catchAsynchErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
