const mongoose=require('mongoose');
const {Schema} = mongoose;
const NotesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
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

// user is the collection/table name to be maintained for storage of user notes

//! purpose=> This will decide in what schema our Notes data is going to be saved in mongoDB