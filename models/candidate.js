const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var candidateSchema=new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String
    }
},{
    timestamps:true
})
const candidate=mongoose.model("Candidate",candidateSchema)
module.exports = candidate