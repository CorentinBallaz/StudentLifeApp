var mongoose = require('mongoose');

var AdeEventSchema = new mongoose.Schema({
        title : {
            type :String,
            required:true,

        },
        description : {
            type:String,
            required : true,

        },
        place : {
            type:String,
            required: true
        },
        startTime : {
            type : Date
        },
        endTime:{
            type:Date
        },
        occurence:{
            type:String
        }
})
module.exports = mongoose.model('EventAde', AdeEventSchema);