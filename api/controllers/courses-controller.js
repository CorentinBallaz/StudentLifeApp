var User = require('../models/user')
var Structure = require('../models/structureCourses')

exports.getStructureBySpe=(req,res)=>{
    User.findOne({_id:req.params.userID}).exec( async function(err,user){

        if (err) throw err;
        else {
            let filiere= await user['filiere'];
            let filiereGobal = filiere.substring(0,3);
            // console.log()

            Structure.find({specialite :filiereGobal} ).exec(function (err,structure) {
                if (err) throw err;
                else {
                    let resu =  structure;
                    return res.status(200).send(resu);
                }

            })


        }
    })

}
