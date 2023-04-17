const mongoose  = require('mongoose')
const url = "mongodb://127.0.0.1:27017/admissionportal"
const live_Url ="mongodb+srv://vishwasgupta81779:vishwas143@cluster0.hdd68fy.mongodb.net/Brokerportal?retryWrites=true&w=majority"

const connectDB =()=>{
    return mongoose.connect(live_Url)


    .then(()=>{
        console.log("Database connected...")

    })
    .catch((error)=>{
        console.log(error)

    })
}

module.exports = connectDB