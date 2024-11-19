const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 2121
const cors = require('cors')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname))
async function connect(){
 try{
     await mongoose.connect('mongodb+srv://dineshvardhan654:dinesh12599@cluster0.srz5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
         useNEWUrlParser: true,
         useUnifiedTopology: true,
     })
     console.log('db connected......')
 }catch(err){
     console.log(`ERROR: ${err}`)
 }
}
connect()
const userSchema = new mongoose.Schema({
 username:String,
 password:String,

})
const Users = mongoose.model('data',userSchema)


app.get('/',(req,res)=>{
 res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/post',async(req,res)=>{
 const {username,password} = req.body
 const user = new Users({
  username,
  password
 })
 await user.save()
 console.log(user)
 res.send("SORRY. YOUR REQUEST FOR VOTING IS FAILD!")
})
app.listen(port,()=>{
 console.log('server started...')
})