const data = require("../models/admin.model")
const asyncWrapper = require("../middleware/asyncWrapper")
const bcrypt = require("bcrypt")
const genrate = require("../utils/genrateToken")

const allUsers = asyncWrapper(async(req,res)=>{
    const users = await data.find({}, {password: false, __v: false});
    res.json(users)
} )

const getuser = asyncWrapper(async(req,res)=>{
    const user = await data.findById(req.params.id, {password: false, __v: false});
    if(!user) return res.status(404).json({msg:"User not found"})
    res.json(user)
})

const register = asyncWrapper(async(req,res)=>{
  const { fullName, email, phone,password } = req.body;
  const existingUser = await data.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new data({ fullName, email,phone, password: hashedPassword });
  const token = await genrate({email: user.email , id : user.id});
  user.token = token;
  await user.save();


  res.json({
    message: "User registered successfully",
    token
  });
})

const login = asyncWrapper(async(req,res)=>{
    const {email, password} = await req.body
    if (!email && !password) {
         return res.status(400).json({ message: "Please provide email and password" });
    }
    const user = await data.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Please provide email and password" });
    }
    if (user && isMatch) {
         const token = await genrate({email : user.email , id : user.id})
         return res.status(200).json({data: {token}})
    }else {
        return res.status(401).json({ message: "Please provide email and password" });
    }
})

const updateUser = asyncWrapper(async (req, res) => {
    const id = req.params.id;
  
    // Validate user input if needed (can use libraries like Joi or custom validation)
    const { password, ...updateFields } = req.body;
  
    // If password needs to be updated, hash it before storing
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust saltRounds as needed
      updateFields.password = hashedPassword;
    }
  
    try {
      const user = await data.updateOne(
        { _id: id },
        { $set: updateFields }
      );
  
      if (user.modifiedCount === 0) {
        return res.status(404).json({ error: "No user found or no changes made" });
      }
  
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  });
  

const deleteUser = asyncWrapper(async(req,res)=>{
        await data.deleteOne({_id: req.params.id})
        res.json({ message: "User deleted successfully." })
})

module.exports = {
    allUsers,
    getuser,
    register,
    login,
    updateUser,
    deleteUser,
 
}