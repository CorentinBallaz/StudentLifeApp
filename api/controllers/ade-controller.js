var Ade = require('../models/ade');
var Event = require('../models/event')

exports.getEvents = (req,res)=> {
    Ade.findOne({filiere:"IDU4-A1"},(err1,res1)=>{console.log(res1)}).populate("events").exec(function (err,ade) {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.json(ade);
        }
    })
} 
