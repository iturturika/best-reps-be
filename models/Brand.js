import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    label: {
        type: String,
        unique: true,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model('Brand', BrandSchema);