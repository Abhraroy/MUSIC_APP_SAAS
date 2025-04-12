import multer from "multer"

const upload = multer({dest:"/uploads"})

const uploadFiles = upload.fields([
    {name:'audio',maxCount:1},
    {name:'thumbnail',maxCount:1}
])



export default uploadFiles