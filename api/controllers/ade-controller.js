var Ade = require('../models/ade');
var EventAde = require('../models/eventAde')
var User = require('../models/user')
exports.getEventsAde = (req,res)=> {
    Ade.findOne({filiere:"IDU4-A1"}).populate("events").exec(function (err,ade) {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        else {
            return res.json(ade);
        }
    })
} ;

exports.getCoursesNumber = (req,res)=>{

    //number course begining : 30 march 2020
    switch (req.params.numberWeek) {
        case "1":
            console.log("1week");
            var today = new Date(2020,2,30);
            var lt = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
            break;

        case "2":
            var today = new Date(2020,2,30);
            var lt = new Date(today.getFullYear(), today.getMonth(), today.getDate()+14);
            break;
        case "3":
            console.log("1month");
            var today = new Date(2020,2,30);
            var lt = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
            break;
        default:
            console.log('"udefinedDateType"')
            return res.status(400).send("udefinedDateType");
    }

    User.find({_id:req.params.userID}).exec( async function(err,user){
        if (err) {
            return res.status(400).send({ 'msg': err });
        }else {
            let filiere =await  user[0]["filiere"];
            // console.log(filiere)
            Ade.aggregate([{$match : {filiere:filiere}},{ "$unwind": "$events" },{ "$lookup": {
                    "from": "eventades",
                    "as": "eventsObject",
                    pipeline :[{$match : {startTime:{$gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),$lt: lt } }}, { $group: { _id: "$type", count: { $sum: 1 } }} ]
                }}],function (err,response) {
                if (err) throw err;
                // console.log(response[0]["eventsObject"])
                res.status(200).send(response[0]);
            })

        }

    })


};

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
