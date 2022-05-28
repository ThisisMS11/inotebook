const mongoose=require('mongoose');
const {Schema} = mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model('mohit', UserSchema);

// User.createIndexes(); // <-- this will help in uniquely identifying each document
module.exports=User;
//! above 'mohit' is the collection or table name