var mongoose = require('mongoose');

var MarksSchema  = new mongoose.Schema({

   email :{
        type:String
    }


})

module.exports = mongoose.model('Marks', MarksSchema,'marks');
