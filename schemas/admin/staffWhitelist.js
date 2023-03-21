import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
})

export default mongoose.model("botStaff", schema);