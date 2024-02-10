const User = require('../models/User');
const fs = require('fs');

const createUser = async (req, res) => {
    try {
        let profile_picture = '';
        if(req.file){
            profile_picture = req.file.destination.substr(7) + req.file.filename;
        }
        const user = await User.create({profile_picture: profile_picture, ...req.body});
        res.status(200).json({ message: "User created successfully.", data: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
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

    const profile_picture = req.file.destination.substr(7) + req.file.filename;

    const afterUpdateUser = { 'profile_picture': profile_picture, ...req.body };

    try {
        const beforeUpdateUser = await User.findById(userId);

        if (!beforeUpdateUser) {
            return res.status(404).json({ error: "User is not found." });
        }

        const old_profile_picture = beforeUpdateUser.profile_picture;

        const updatedUser = await User.findByIdAndUpdate(userId, afterUpdateUser, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User is not found." });
        }

        await fs.promises.unlink(`public/${old_profile_picture}`);
        
        res.status(200).json({ message: "User is updated successfully.", data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server error" });
    } 
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deleteUser = await User.findOneAndDelete(userId);
        if(!deleteUser){
            res.status(404).json({ error: "User is not found." })
        }else{
            if(deleteUser.profile_picture){
                fs.unlink(`public/${deleteUser.profile_picture}`, () => {});
            }
            res.status(200).json({ message: "User is deleted successfully.", data: deleteUser})
        }

    } catch (error) {
        res.status(500).json({error: error})
    }
}

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser};    