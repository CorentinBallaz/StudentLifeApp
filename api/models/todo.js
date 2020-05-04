var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
        email : {
            type :String,

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
        categorie :{
            type:String,
            required : true
        },
        isDone:{
            type:Boolean
        }
})
module.exports = mongoose.model('Todo', TodoSchema);
