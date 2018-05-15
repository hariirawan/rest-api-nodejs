const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   NIK: String,
   name:String,
   username:String,
   email:String,
})

module.exports= mongoose.model('Admin', adminSchema);