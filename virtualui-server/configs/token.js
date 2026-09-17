import jwt from "jsonwebtoken"

export const gentoken = async (userId) => {
    try {
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "30d"} )
        return token
    } catch (error) {

    }
}