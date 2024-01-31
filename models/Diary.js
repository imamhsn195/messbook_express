const mongoose = require('mongoose')

const diarySchema = mongoose.Schema({
   title: { type: String, required: true },
   start_date: { type: Date },
   end_date: { type: Date },
   creator: { 
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
   },
   status: { type: Boolean },
   attachment: { type: String }
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;