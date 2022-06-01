const express = require('express');
const router = express.Router();
const Auth = require('../Controllers/auth');
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const Cloudinary =  require ('../model/cloudinary')

const { TOKEN_KEY } = process.env

const storage = multer.diskStorage({
  // inserting  uploading files into the destination ......
  destination: function (req, file, cb){
      cb(null, './uploads/');
  },
  filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname)
  }   
})

const filterType = (req, file, cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
        cb(null, true)
    }else{
        cb(null, err);
    }
}

const upload = multer({ 
  storage: storage 
})
let uplaodToCLoud;
// const testJWT = require('../Controllers/middleware')

// for register process...///
router.post('/auth/register', upload.single('file'), async  (req,res)=>{
    console.log(req.file)
    if(!req.file){
        res.status(400).json("Information input is Require")
      }else{
         uplaodToCLoud =  await Cloudinary.uploader.upload(req.file.path,
             {
                 folder:'portal'
          })
      } 
    
    try{
        let {firstname, lastname, phone, email, address,
        password,
        date,
        state,
        local,
        parent_name,
        parent_number
       } = req.body
        if(!(firstname && lastname && phone && email && req.file.path)){
            
              res.status(400).json("Information input is Require")
        }else{
            const user = await User.create({
              firstname,
              lastname, 
              phone,
              email,
              status:'not yet',
              password,
              address,
              image_url:uplaodToCLoud.url,
              date,
              state,
              local,
              parent_name,
              parent_number
            })
            const token = jwt.sign({token: user},TOKEN_KEY,{expiresIn: "7h",});
            res.json({ message: "Registered in successfully  😊 👌", response:token });
      }
    }catch(err){ 
        res.json({error:err.TypeError})
        console.log(err)
    }
     
});
// 

router.post('/auth/login', Auth.login)//login routing
router.get('/user_profile/:id', Auth.getUserInfo)//student profile

//for the admin part ....
router.patch('/upd', Auth.updateStatus)
router.get('/info', Auth.winInfoList)

module.exports = router       