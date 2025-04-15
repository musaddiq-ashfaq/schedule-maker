import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async(req,res)=>{
    const {email, name, password} = req.body;

    // if(!email || !name || !password){
    //     return res.status(400).json({message:"All fields required"});
    // }

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({message: "User already exist"});
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({email, name, password: hashedPassword});

    if(user){
        return res.status(200).json({message:"User created successfully"});
    }
    else{
        return res.status(400).json({message:"Failed to register user. Try again!"});
    }
}

const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "All fields required"});
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User does not exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:"Wrong Password"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
    res.cookie("token",token,{httpOnly:true});

    return res.status(200).json({message:"Login successfull"});
}

const getUserProfile = async(req,res)=>{
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
        res.status(404).json({message:"User not found"});
    }

    res.json(user);
}

export { registerUser, loginUser, getUserProfile };
