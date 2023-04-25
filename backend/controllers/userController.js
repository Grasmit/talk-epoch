const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken.js')

const registerUser = asyncHandler(async (req, res, next) => {

    const { name, email, password, pic } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please enter all information')
    }

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }

    const newUser = await User.create({
        name,
        email,
        password,
        pic
    })

    if (newUser) {
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            pic: newUser.pic,
            token: generateToken(newUser._id)
        })
    }
    else {
        res.status(500)
        throw new Error('Something went wrong')
    }

})

const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body

    console.log(email, password)

    if (!email || !password) {
        res.stus(400)
        throw new Error('Please enter all information')
    }

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(500)
        throw new Error('Invalid Email or password')
    }

})

const allUsers = asyncHandler(async (req, res, next) => {

    const search = req.query.search ? {

        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]

    } : {}

    const users = await User.find(search).find({ _id: { $ne: req.user._id } })

    res.json(users)

})

module.exports = { registerUser, login, allUsers }