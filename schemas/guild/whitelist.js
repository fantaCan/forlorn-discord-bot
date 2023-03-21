import mongoose from "mongoose";

const schema = new mongoose.Schema({
    guild_id: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    whitelist: {
        type: Array,
        required: false
    }
})

export default mongoose.model("guilds", schema);
