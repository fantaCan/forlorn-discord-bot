import mongoose from "mongoose";

const schema = new mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    keyOwner: {
        type: Object,
        required: true
    },
    guilds: {
        type: Array,
        required: false 
    },
    slots: {
        type: Number,
        required: true
    }
})

export default mongoose.model("OwnerKeys", schema);