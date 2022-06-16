const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
 username:String,
 password:String,
 posts:[{type:mongoose.Schema.Types.ObjectId,ref:'posts'}]
})

module.exports = mongoose.model('user',UserSchema)