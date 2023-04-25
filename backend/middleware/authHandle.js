const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require('express-async-handler')

const authrisedUser = asyncHandler(async (req, res, next) => {

    let userToken

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            userToken = req.headers.authorization.split(" ")[1]

            const decode = jwt.verify(userToken, process.env.JWT)

            req.user = User.findById(decode.id).select("-password");

            next()

        } catch (err) {
            res.status(401)
            throw new Error("Not authorized, invalid token")
        }
    }

    if (!userToken) {
        res.status(401)

        throw new Error("Not authorized, no token")
    }
})

module.exports = { authrisedUser }