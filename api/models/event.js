var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
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
        occruence:{
            type:String
        }
})
module.exports = mongoose.model('Event', EventSchema);