var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
        email : {
            type :String,

        },
        label : {
            type:String,
            required : true,
            unique:true

        },
        content : {
            type:String,
            required: true
        },
        deadline : {
            type : Date

        },
        isDone:{
            type:Boolean,
            default:true
        }
})
module.exports = mongoose.model('Todo', TodoSchema);
