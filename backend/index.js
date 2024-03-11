
const express=require("express")
const connection=require("./configs/db")
const {userRouter}=require("./route/userRouter")
const {authentication}=require("./middleware/auth.middleware")
const courseRoutes = require('./routes/course.routes');
require("dotenv").config()
const cors=require("cors")
const app=express()
app.use(express.json())
const port=process.env.port|| 8080

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to homepage of EduHub Backend")
})

app.use("/user",userRouter)
app.use(authentication)
app.use('/api/courses', courseRoutes);

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connnection succesfully to db")
    } catch (error) {
      console.log(error)  
    }
    console.log("Port Running at 8080")
})