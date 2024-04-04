import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token ")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, about, contactNo,password } = req.body


    if (
        [name, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")

    }

    const existedUser = await User.findOne({
        $or: [{ contactNo }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or contactNo already exists")
    }
    // console.log(req.files);
    // console.log(JSON.stringify(req.files, null, 2));

    let avatarLocalPath = req.file?.path;
    console.log("avatarLocalPath",avatarLocalPath);

    let avatar = await uploadOnCloudinary(avatarLocalPath)
    

    console.log(avatar);
    const user = await User.create({
        name,
        email,
        password,
        about,
        contactNo,
        avatar: avatar?.url,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, contactNo, password } = req.body

    if (!contactNo && !email) {
        throw new ApiError(400, "contactNo OR password is requird")
    }

    const user = await User.findOne({
        $or: [{ contactNo }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordVaild = await user.isPasswordCorrect(password)

    if (!isPasswordVaild) {
        throw new ApiError(401, "Invalid user credentials // password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )


    const option = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "User logged out"))
})




export{
    registerUser,
    loginUser,
    logoutUser
}