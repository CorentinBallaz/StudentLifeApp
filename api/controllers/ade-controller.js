var Ade = require('../models/ade');
var EventAde = require('../models/eventAde')

exports.getEvents = (req,res)=> {
    Ade.findOne({filiere:"IDU4-A1"}).populate("events").exec(function (err,ade) {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.json(ade);
        }
    })
} 
