const mongoose = require("mongoose")
require('dotenv').config()

const Connnection = mongoose.connect(process.env.SERVER_PORT)

module.exports={
    Connnection
}
