const mongoose = require("mongoose")

const SliderSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
})


module.exports = mongoose.model('Sliders', SliderSchema)