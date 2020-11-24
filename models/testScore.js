const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testSchema=new Schema({
    Candidate:{
        type:Schema.Types.ObjectId,
        ref:'Candidate'
    },
   first_Round:{
       type:Number,
       min:0,
       max:10
   },
   second_Round:{
    type:Number,
    min:0,
    max:10
   },
   thrid_Round:{
    type:Number,
    min:0,
    max:10
}
},{
    timestamps:true
})
const Test=mongoose.model("Test",testSchema)
module.exports = Test