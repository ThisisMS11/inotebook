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

module.exports=mongoose.model('mohit', UserSchema);
//! above 'mohit' is the collection or table name