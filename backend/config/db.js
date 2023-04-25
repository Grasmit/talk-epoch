const mongoose = require('mongoose')

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`mongo Atlas connected : ${conn.connection.host}`)
    }
    catch (err) {

        console.log("error occured : ", err.message)
    }
}

module.exports = connectDB