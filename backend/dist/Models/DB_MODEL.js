import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const user = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    }
}, {
    timestamps: true
});
const media = new Schema({
    audio_asset_id: {
        type: String,
        required: true,
        unique: true
    },
    audio_URL: {
        type: String,
        required: true,
        unique: true
    },
    audio_name: {
        type: String
    },
    img_asset_id: {
        type: String,
        required: true,
        unique: true
    },
    img_URL: {
        type: String,
        required: true,
        unique: true
    },
});
export const userModel = mongoose.model("user", user);
export const mediaModel = mongoose.model("media", media);
