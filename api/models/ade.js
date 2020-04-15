var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var AdeSchema = new mongoose.Schema({
        filiere : {
            type :String,
            required:true,
        },
        events : [{ type: Schema.ObjectId, ref: "EventAde" }]
})
module.exports = mongoose.model('Ade', AdeSchema);