var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var EadSchema = new mongoose.Schema({
        filiere : {
            type :String,
            required:true,
        },
        events : [{ type: Schema.ObjectId, ref: "EventEad" }]
})
module.exports = mongoose.model('Ead', EadSchema);