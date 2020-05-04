var Ade = require('../models/ade');
var EventAde = require('../models/eventAde')

exports.getEventsAde = (req,res)=> {
    Ade.findOne({filiere:"IDU4-A1"}).populate("events").exec(function (err,ade) {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.json(ade);
        }
    })
} 

exports.getAllEventsAde = (req,res)=> {
    Ade.find({}).exec(function (err,ade) {
        var filieres=[];
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            for(var i=0;i<ade.length;i++){
                console.log(i);
                filieres.push(ade[i]['filiere']);
            };
            return res.json(filieres);
        }
    })
} 
