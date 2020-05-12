var Todo = require('../models/todo');
var User = require('../models/user')



exports.createTodo = (req,res)=>{

    
    User.findOne({_id:req.body.idUser},(err,user) =>{

        if (err) {
            return res.status(400).send({ 'msg': err });
        }else if (!user){
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
        else {
            let newTodo = Todo(req.body);
            newTodo.save((err,todo) =>{
                if (err) {
                    console.log("pb 2");
                    return res.status(400).json({ 'msg': err });
                }


                User.findOneAndUpdate({_id:req.body.idUser},{"$push":{"todos" : todo['_id']}},(err,todo)=>{
                    if (err) throw err;
                    res.json({info: 'Success'});


                })

            });

        }


    })


};

exports.getTodos = (req,res)=>{

    //
    //     if (err) throw err;
    //
    //
    //     res.json(todos);
    //
    // })
    User.find({_id:req.params.userID}).populate("todos").exec(
        function (err,todos) {
            if (err) {
                return res.status(400).send({'msg': err});
            } else {
                resa = todos[0]['todos'];
                res.status(200).send(resa);
            }
        }
    )

}

exports.getTodo = (req,res)=>{


    // User.find({_id:req.params.userID}).populate("todos").exec(
    //     function (err,todos) {
    //         if (err) {
    //             return res.status(400).send({'msg': err});
    //         } else {
    //             resTemp = todos[0]['todos'];
    //             // res.status(200).send(resa);
    //             resTemp.forEach(tuple =>{
    //                 if (tuple['label'] == req.params.label){
    //                     return res.status(200).send(tuple)
    //                 }
    //                 }
    //
    //             )
    //         }
    //     }
    // )
    User.find({_id:req.params.userID}).populate({path :"todos",match: {_id:req.params.todoID}}).exec(
        function (err,todo){

            if (err) throw err;
            var leTodo = todo[0]['todos'][0];
            return res.status(200).send(leTodo)
        }

    )

};


exports.deleteTodo = (req,res)=>{
    console.log("passé dans delete");
    User.update({_id:req.params.userID},{$pull : {todos :req.params.todoID}}).exec( function (err,resa) {
        if (err) throw err;

        Todo.remove({_id: req.params.todoID}).exec(function (err1,resT) {
            if (err) throw err1;
            return res.json({info:"Success"});

            //res.status(200).send("Todo deleted")
        })
    })


};

exports.updateTodo = (req,res)=>{
    Todo.findByIdAndUpdate(req.params.todoID,req.body,{new: true},function (err,todo) {
        if (err) throw err;

        res.status(200).send(todo);
    })
};



