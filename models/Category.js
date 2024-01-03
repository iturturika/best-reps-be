import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    label: {
        type: String,
        unique: true,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model('Category', CategorySchema);