const Diary = require('../models/Diary');

const createDiary = async (req, res) => {
    try {
        const diary = await Diary.create(req.body);
        await diary.populate('creator');
        res.status(200).json({ message: "Diary created successfully.", data: diary });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAllDiarys = async (req, res) => {
    console.dir(req.body);
    try{
        const users = await Diary.find().populate('creator');
        res.json(users)
    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getDiaryById = async (req, res) => {
    const userId = req.params.id;
    try{
        const diary = await Diary.findById(userId).populate('creator')
        if(!diary){
            res.status(404).json({error: "Diary is not found!"})
        }
        res.json(diary);
    }catch(error){
        res.status(500).json({error: "Internal Server Error"})
    }
}

const updateDiary = async (req, res) => {
    const userId = req.params.id;
    try {
        const updateDiary = await Diary.findByIdAndUpdate(userId, req.body, { new: true }).populate('creator')
        if(!updateDiary){
            res.status(404).json({error: "Diary is not found."})
        }else{
            res.status(200).json({ message: "Diary is updated successfully.", data: updateDiary })
        }
    } catch (error) {
        res.status(500).json({error: "Internal Server error"})
    }
}

const deleteDiary = async (req, res) => {
    const userId = req.params.id;
    try {
        const deleteDiary = await Diary.findOneAndDelete(userId).populate('creator');
        if(!deleteDiary){
            res.status(404).json({ error: "Diary is not found." })
        }else{
            res.status(200).json({ message: "Diary is deleted successfully.", data: deleteDiary})
        }
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = { createDiary, getAllDiarys, getDiaryById, updateDiary, deleteDiary};    