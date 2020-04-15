var mongoose = require('mongoose');

var EadEventSchema = new mongoose.Schema({
        title : {
            type :String,
            required:true
        },
        description : {
            type:String,
            required : true
        },
        startTime : {
            type : Date
        },
        endTime:{
            type:Date
        }
})
module.exports = mongoose.model('EventEad', EadEventSchema);