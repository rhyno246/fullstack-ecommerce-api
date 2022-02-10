const ErrorHandler = require("../utils/errorhandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const Contacts = require("../model/contactModel");

//get all contact
exports.getAllContact = catchAsynchErrors(async (req, res, next) => {
  const contacts = await Contacts.find();
  res.status(200).json({ success: true, contacts });
});
//create contact
exports.createContact = catchAsynchErrors(async (req, res, next) => {
  const { name, email, phone, nodeted } = req.body;
  if (!name || !email || !phone || !nodeted) {
    return next(new ErrorHandler("Please Enter Feild Input", 400));
  }

  const contacts = await Contacts.create({
    name,
    email,
    phone,
    nodeted,
  });

  res
    .status(200)
    .json({ success: true, message: "Create Slider SuccessFully", contacts });
});
//delete contact
exports.deleteContact = catchAsynchErrors(async (req, res, next) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    return next(new ErrorHandler("Data not found", 404));
  }
  await contact.remove();
  res
    .status(200)
    .json({ success: true, message: "Delete Slider Successfully" });
});
