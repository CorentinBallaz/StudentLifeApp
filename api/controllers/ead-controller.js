var Ead = require('../models/ead');
var EventEad = require('../models/eventEad')
var User = require('../models/user')
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

exports.getEventsFromDate = (req,res)=>{

    switch (req.params.numberWeek) {
        case "1":
            console.log("1week");
            var today = new Date();
            var lt = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
            break;

        case "2":
            var today = new Date();
            var lt = new Date(today.getFullYear(), today.getMonth(), today.getDate()+14);
            break;
        case "3":
            console.log("1month");
            var today = new Date();
            var lt = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
            break;
        default:
            console.log('"udefinedDateType"')
            return res.status(400).send("udefinedDateType");
    }

    User.findOne({_id:req.params.userID}).exec(async function (err,user) {
        if (err) throw err;
        else{
            let filiere = await user["filiere"];

            Ead.aggregate([{$match : {filiere:filiere}},{ "$unwind": "$events" },{ "$lookup": {
                    "from": "eventeads",
                    "as": "eventsObject",
                    pipeline :[{$match : {startTime:{$gte: new Date(today.getFullYear(), today.getMonth()-2, today.getDate()),$lt: lt } }} ]
                }}],function (err,response) {
                if (err) throw err;
                // console.log(response[0]["eventsObject"])
                res.status(200).send(response[0]);
            })

        }
    })
}

