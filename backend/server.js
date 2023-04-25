const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = express()

const userRoutes = require('./routes/userRoute.js')
const { notFound, errorHandler } = require('./middleware/errorhandle.js')

app.use(express.json())

dotenv.config()

app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/", (req, res) => {
    res.send("API is running")
})

app.use("/api/user", userRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT, () => {

    console.log('Server started on :', process.env.PORT)

    connectDB()

})