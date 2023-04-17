const mongoose = require('mongoose')

//define schema
const CourseSchema = new mongoose.Schema({

         name:{
            type:String,
            require:true,
         },
         email:{
            type:String,
            require:true,
         },
         mobile:{
            type:String,
            require:true,
         },
         dob:{
            type:String,
            require:true,
         },
         gender:{
            type:String,
            require:true,
         },
         address:{
            type:String,
            require:true,
         },
         collage:{
            type:String,
            require:true,
         },
         subject:{
            type:String,
            require:true
         },
         branch:{
            type:String,
            require:true
         },
         user_id:{
            type:String,
            require:true
         }
      

        } ,{timestamps:true})
         //create collection
//users is the name of collection
//userschema is the field of blog collection
const CourseModel =mongoose.model('course',CourseSchema)
module.exports = CourseModel