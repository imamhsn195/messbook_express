const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: "User created successfully.", data: user});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllUsers = async (req, res) => {
    console.dir(req.body);
    try{
        const users = await User.find();
        res.json(users)
    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try{
        const user = await User.findById( userId )
        if(!user){
            res.status(404).json({error: "User is not found!"})
        }
        res.json(user);
    }catch(error){
        res.status(500).json({error: "Internal Server Error"})
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
        if(!updateUser){
            res.status(404).json({error: "User is not found."})
        }else{
            res.status(200).json({ message: "User is updated successfully.", data: updateUser })
        }
    } catch (error) {
        res.status(500).json({error: "Internal Server error"})
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deleteUser = await User.findOneAndDelete(userId);
        if(!deleteUser){
            res.status(404).json({ error: "User is not found." })
        }else{
            res.status(200).json({ message: "User is deleted successfully.", data: deleteUser})
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser};    