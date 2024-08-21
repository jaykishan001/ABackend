import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from  "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=> {
    //step 1 take user data from req.body

    //step 2 validation - not empty
    //step 3 check if user already exist through username or email
    //step 4 check for images, check for avatar
    //step 5 if image is available upload them on cloudinary, check image got upload or not
    //step 6 create user object - create entry in db
    //step 7 remove password and refresh token filed from response 
    //step 8 check for user creation if done then return  response other wise throw error
   
   
    const {username, fullName, email, password} = req.body;

    console.log("email:", email)


    // if (username === "" || fullName === "" || email === "" || password === "") {
    //     throw new ApiError(400, "All Filed must be filed ")
    // }

    if([fullName, username, email, password].some((field)=> field?.trim() === "" )) {
        throw new ApiError(400 , "All fileds are required")
    }

    const userInstance =  await User.findOne({
        $or: [{email} , {username}]
    });

    if(userInstance) {
        throw  new ApiError(409, "User already exist")
    }

    console.log(req.files)

    const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath) {
        throw new ApiError(404, "Avatar files path is not available");
    }   

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImageLocalPath = req.files.coverImage[0].path
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)



    if(!avatar) {
        throw new ApiError(404, "File is not present in cloudinary");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    
    const createdUser = await User.findById(user._id).select(" -password -refreshToken")

    if(!createdUser) {
        throw new ApiError(404, "Something went wrong while creating a user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered SuccessFully" )
    )

})

export {registerUser};