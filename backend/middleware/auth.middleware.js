
const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            const userID=decoded.userID
            console.log(decoded)
            req.body.userID=userID
            next()
        }
        else{
            res.send("Login is required first!!")
        }
    }
    else{
        res.send("Login first!!")
    }
}
module.exports={auth}