const mongoose=require('mongoose');
const NotesSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('user', NotesSchema);

//! purpose=> This will decide in what schema our Notes data is going to be saved in mongoDB