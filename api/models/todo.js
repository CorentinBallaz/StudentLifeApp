var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
        email : {
            type :String,
            required:true,

        },
        label : {
            type:String,
            required : true,

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
