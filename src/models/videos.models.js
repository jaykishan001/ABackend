import mongoose from "mongoose";
import aggregatePaginate  from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

videoSchema.plugin(aggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)