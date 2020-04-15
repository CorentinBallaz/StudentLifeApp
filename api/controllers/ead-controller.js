var Ead = require('../models/ead');
var EventEad = require('../models/eventEad')

exports.getEventsEad = (req,res)=> {
    Ead.findOne({filiere:"IDU4-A1"}).populate("events").exec(function (err,ead) {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.json(ead);
        }
    })
} 