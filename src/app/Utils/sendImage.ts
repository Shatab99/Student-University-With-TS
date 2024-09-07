import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage })

//then----->

export const sendImage = async (path : string, public_id: string) => {
    cloudinary.config({
        cloud_name: 'dzy7scp9c',
        api_key: '934315292848967',
        api_secret: 'MAwyFEO59lP31TCBvFcMpXpQBdc' // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            path, {
            public_id
        }
        )
        .catch((error) => {
            console.log(error);
        });

    fs.unlink(path,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("file deleted from temporary!!")
        }
    })

    console.log(uploadResult);
    return uploadResult
}


