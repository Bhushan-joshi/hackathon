const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const product=new Schema({
    Title:{type:String,required:true},
    Price:{type:Number,required:true},
    Imageurl:{type:String,required:true},
    Description:{type:String,required:true},
    by:{
        type: String,
        required: true,
    },
    sellerid:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});


module.exports = mongoose.model('Product', product);