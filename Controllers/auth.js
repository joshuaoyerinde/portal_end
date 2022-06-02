require('dotenv').config()
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const {TOKEN_KEY} = process.env

// login user  
const login = async (req,res)=>{
    try{
      const { email } = req.body
      console.log(email)
      const user = await User.findOne({email});
      if(user){
        const token = jwt.sign({token: user},TOKEN_KEY,{expiresIn: "4m",});
        res.json({ message: "Login successfully  😊 👌", response:token });
        // res.status(200).json({message:"login sucessfully", resp:user.link})
      }else{  
        res.status(400).json({message:"Invalid Details"})
      }
    }catch(err){
      console.log(err)
    }
}

//for user profile
const getUserInfo = async (req,res)=>{
    try{
      let id = req.params.id
      let userinfo = await User.findOne({_id:id})
      res.json({response: userinfo});
      // console.log(userinfo)
    }catch(err){
      console.log(err)
    }
}
//testing the device detect 


//this part is for the admin to get all the information of the users //......
//for user info
const getAllApplicant = async (req, res)=>{
  // console.log(req.params.link)
  try{
    const info = await User.find({})
    res.json({response:info});
  }catch(err){
    console.log(err)
  }
}

//update the users status
const updateStatus = async (req, res)=>{
  let id = req.body.id
  // console.log(id)
  // let id = "6294d0c0779aace4dbc78962";
  try{
    let updateStudStatus = { $set: {status: 'admit' } };
    let upd = await User.updateOne({_id:id},  updateStudStatus)
    if(upd){
      res.json({message: 'Approve'});
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = {login, getAllApplicant, getUserInfo, updateStatus};