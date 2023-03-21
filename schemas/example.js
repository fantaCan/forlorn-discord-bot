import mongoose from "mongoose";

const schema = new mongoose.Schema({
    example: {
        type: String,
        required: false
    }
})

export default mongoose.model("example", schema);