const mongoose = require('mongoose')
require('dotenv').config()

const connnectDb = async ()=>{
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connnectDb