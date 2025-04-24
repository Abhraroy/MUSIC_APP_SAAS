
// multer configuration for uploading files

import multer from "multer"

const upload = multer({dest:"/uploads"}) //temporary storage creation



//  uploadfile 

const uploadFiles = upload.fields([
    {name:'audio',maxCount:1},
    {name:'thumbnail',maxCount:1}
])



export default uploadFiles