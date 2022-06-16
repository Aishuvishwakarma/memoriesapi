const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
 image:String,
 title:String,
 userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'}
})

module.exports = mongoose.model('post',PostSchema)