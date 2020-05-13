var mongoose = require('mongoose');

var StructureSchema  = new mongoose.Schema({

    specialite :{
        type:String
    }


})

module.exports = mongoose.model('Structure', StructureSchema,'courses');
