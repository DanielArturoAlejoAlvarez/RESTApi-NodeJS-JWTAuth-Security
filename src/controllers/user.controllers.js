import User from "../models/User"

export const getUsers = async (req,res)=>{
    const users = await User.find().populate("roles")
    return res.json(users)
}

export const getUser = async (req,res)=>{
    
}

export const saveUser = async (req,res)=>{

}

export const updateUser = async (req,res)=>{

}

export const deleteUser = async (req,res)=>{

}