import { gentoken } from "../configs/token.js"
import User from "../models/user.model.js"

export const googleAuth = async (req, res) => {
    try{
        const {name, email} = req.body
        let user = await User.findOne({ email })
        if(!user){
            user = await User.create({
                name, email
            })
        }
        let token = await gentoken(user._id)
        res.cookie("token" , token , {
            httpOnly : true,
            secure: false,
            sameSite: "strict",
            maxAge: 31 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json(user)
    } catch (error){
        return res.status(500).json({message:`google Auth error ${error}`})
    }
}

export const logOut = async (req, res) => {
    try {
        await res.clearCookie("token" , {
            httpOnly : true,
            secure : false,
            sameSite : "strict"
        })
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
        return res.status(500).json({message: `failed to logout User ${error}`})
    }
}