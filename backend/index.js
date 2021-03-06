require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./src/routes/productRoute");
const userRouter = require("./src/routes/userRoute");
const orderRouter = require("./src/routes/orderRoute");
const paymentRouter = require("./src/routes/paymentRoute");
const sliderRouter = require("./src/routes/sliderRoute");
const contactRouter = require("./src/routes/contactRoute");
const errorMiddleware = require("./src/middleware/error");
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

//connect db
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apiv1.wkkey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log("mongoose is connected");
  } catch (error) {
    console.log(error.message);
    process.env.exit(1);
  }
};
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", sliderRouter);
app.use("/api/v1", contactRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running port ${PORT}`);
});
