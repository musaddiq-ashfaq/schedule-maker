import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    startTime:{
        type: Date,
        required: true,
    },
    endTime:{
        type: Date,
        required: true,
    }
}, {timestamps: true});

export default mongoose.model("Schedule", scheduleSchema);