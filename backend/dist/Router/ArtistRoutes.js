import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import multer, { Multer } from "multer";
import uploadFiles from "../middleware/UploadFiles.js";
import { mediaModel } from "../Models/DB_MODEL.js";
import { checkAdminAuth, isAdmin } from "../middleware/AdminCheck.js";
const ArtistRoutes = Router();
ArtistRoutes.post("/Admin-login", isAdmin, (req, res) => {
    if (req.session) {
        req.session.isAdminAuthenticated = true;
    }
    res.status(200).json({ msg: "Welcome Admin" });
});
ArtistRoutes.post("/Admin-logout", isAdmin, (req, res) => {
    if (req.session) {
        req.session.isAdminAuthenticated = false;
    }
    res.status(200).json({ msg: "Goodbye Admin" });
});
ArtistRoutes.post("/upload", checkAdminAuth, uploadFiles, async (req, res) => {
    try {
        const audioFile = req.files?.["audio"]?.[0];
        if (!audioFile) {
            res.status(400).json({ error: "Audio file not found" });
        }
        const thumbnailFile = req.files?.["thumbnail"]?.[0];
        if (!thumbnailFile) {
            res.status(400).json({ error: "Thumbnail file not found" });
        }
        const audioUploadResult = await cloudinary.uploader.upload(audioFile.path, {
            folder: "media/audio",
            resource_type: "video",
        });
        const thumbnailImgUploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
            folder: "media/thumbnail",
            resource_type: "image",
        });
        fs.unlink(audioFile.path, (err) => {
            if (err) {
                console.error("Failed to delete file:", err);
            }
            else {
                console.log("File deleted asynchronously!");
            }
        });
        fs.unlink(thumbnailFile.path, (err) => {
            if (err) {
                console.error("Failed to delete file:", err);
            }
            else {
                console.log("File deleted asynchronously!");
            }
        });
        try {
            const media = await mediaModel.create({
                audio_asset_id: audioUploadResult.asset_id,
                audio_URL: audioUploadResult.url,
                audio_name: audioUploadResult.original_filename,
                img_asset_id: thumbnailImgUploadResult.asset_id,
                img_URL: thumbnailImgUploadResult.url
            });
            media.save();
            console.log("successfully saved to database");
        }
        catch (error) {
            console.log(error);
        }
        res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        res.status(500).json({ errormsg: "An error occurred during file upload", error });
    }
});
export default ArtistRoutes;
