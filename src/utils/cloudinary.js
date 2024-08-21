import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

cloudinary.config({ 
    cloud_name:  process.env.CLOUDINARY_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
   try {
    if(!localFilePath) throw new Error("File path not exist");
    const response =  await cloudinary.uploader.upload(localFilePath)
    // console.log("Url of uploaded file is !!", response.url)
    try {
        fs.unlinkSync(localFilePath)
    } catch (error) {
        console.log("there is some problem while deleting file")
    }
    return response;

   }
    
   catch (error) {
    console.log("There is some problem while uploading file on Cloudinary", error)
    try {
        fs.unlinkSync(localFilePath)
    } catch (error) {
        console.log("there is some problem while deleting file")
    }
    return null;
   
}
}

export {uploadOnCloudinary}