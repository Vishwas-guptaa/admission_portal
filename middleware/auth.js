const jwt =require('jsonwebtoken')
const UserModal =require('../modals/user')




const checkUserAuth = async(req ,res,next)=>{

   //console.log('hello middleware')  
      const {token} = req.cookies
       // console.log(token)
       if(!token){
        req.flash('error','unauthrized admin')
        res.redirect('/')

    }else{
        const data =jwt.verify(token,'vishwas123')
         //console.log(data)
        const user = await UserModal.findOne({_id:data.id})
    //    console.log(user)
        req.user= user
        next()
    }
   
}
module.exports = checkUserAuth
   