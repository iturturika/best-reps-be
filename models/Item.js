import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model('Item', ItemSchema);