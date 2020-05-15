var User = require('../models/user')
var Marks= require('../models/marks')


exports.getMarks = (req,res)=>{

    User.findOne({_id:req.params.userID}).exec( async function(err,user){

        if (err) throw err;
        else {

            Marks.find({email:"ehessel@wittingstark.net"}).exec(function (err,marks) {
                if (err) throw err;
                else {
                     return res.status(200).send(marks);
                }
            })
        }
    })
}

exports.getMarksSemestreFiliere = (req,res) => {

    let semestre = req.params.semestre;
    let filiere = req.params.filiere;
    let json = {};
    json["filiere"]=filiere;
    json[semestre]={ $exists : true };
    Marks.find(json).exec(function(err,marks) {
        if (err) throw err;
        else {
            return res.status(200).send(marks);
        }
    })
}
