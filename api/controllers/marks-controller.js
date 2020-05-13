var User = require('../models/user')
var Marks= require('../models/marks')


exports.getMarks = (req,res)=>{

    User.findOne({_id:req.params.userID}).exec( async function(err,user){

        if (err) throw err;
        else {

            Marks.find({email:user["email"]}).exec(function (err,marks) {
                if (err) throw err;
                else {
                     return res.status(200).send(marks);
                }
            })
        }
    })
}
