// // multer configuration for uploading files
// import multer from "multer"
// const upload = multer({dest:"/uploads"}) //temporary storage creation
// //  uploadfile 
// const uploadFiles = upload.fields([
//     {name:'audio',maxCount:1},
//     {name:'thumbnail',maxCount:1}
// ])
// export default uploadFiles
// UploadFiles.js
import multer from "multer";
import path from "path";
import fs from "fs";
// Make sure the uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Simple multer config (default naming, no custom logic)
const upload = multer({ dest: uploadDir });
// Accept 'audio' and 'thumbnail' fields
const uploadFiles = upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
]);
export default uploadFiles;
