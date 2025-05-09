import { Router } from "express";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import multer, { Multer } from "multer";
import uploadFiles from "../middleware/UploadFiles.js";
import { mediaModel } from "../Models/DB_MODEL.js";
import jwt from "jsonwebtoken";
import { isAdmin } from "../middleware/AdminCheck.js";

// Extend Express Request to include session with our custom property
declare module "express-session" {
  interface SessionData {
    isAdminAuthenticated?: boolean;
  }
}

// Extend the Request interface to include the 'files' property
interface CustomRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

const ArtistRoutes = Router();

ArtistRoutes.post("/Admin-login", (req: Request, res: Response) => {
  const { Admin_Pin } = req.body;
  console.log(Admin_Pin)
  try {
    let token;
    if (Admin_Pin == process.env.ADMIN_PIN) {
      token = jwt.sign(
        {
          isAdmin: true,
        },
        process.env.JWT_SECRET
      );
      console.log(token)
      res.status(200).json({
        msg: "Admin login successful",
        token: token,
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Not successfull",
    });
  }
});

ArtistRoutes.post("/Admin-logout", isAdmin, (req: Request, res: Response) => {
  if (req.session) {
    req.session.isAdminAuthenticated = false;
  }
  res.status(200).json({ msg: "Goodbye Admin" });
});

ArtistRoutes.post(
  "/upload",
  isAdmin,
  uploadFiles,
  async (req: CustomRequest, res: Response) => {
    try {
      const audioFile = req.files?.["audio"]?.[0];
      if (!audioFile) {
        res.status(400).json({ error: "Audio file not found" });
      }
      const thumbnailFile = req.files?.["thumbnail"]?.[0];
      if (!thumbnailFile) {
        res.status(400).json({ error: "Thumbnail file not found" });
      }

      const audioUploadResult = await cloudinary.uploader.upload(
        audioFile.path,
        {
          folder: "media/audio",
          resource_type: "video",
        }
      );
      const thumbnailImgUploadResult = await cloudinary.uploader.upload(
        thumbnailFile.path,
        {
          folder: "media/thumbnail",
          resource_type: "image",
        }
      );
      fs.unlink(audioFile.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        } else {
          console.log("File deleted asynchronously!");
        }
      });
      fs.unlink(thumbnailFile.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        } else {
          console.log("File deleted asynchronously!");
        }
      });

      try {
        const media = await mediaModel.create({
          audio_asset_id: audioUploadResult.asset_id,
          audio_URL: audioUploadResult.url,
          audio_name: audioUploadResult.original_filename,
          img_asset_id: thumbnailImgUploadResult.asset_id,
          img_URL: thumbnailImgUploadResult.url,
        });
        media.save();
        console.log("successfully saved to database");
      } catch (error) {
        console.log(error);
      }
      res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ errormsg: "An error occurred during file upload", error });
    }
  }
);

export default ArtistRoutes;
