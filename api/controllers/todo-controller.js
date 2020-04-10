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
                // res=todos;
                // return res;
                console.log(todos.valueOf('todos'))
                resa = todos[0]['todos'];
                res.status(400).send(resa);
            }
        }
    )

}

exports.getTodo = (req,res)=>{

    Todo.find({email:req.params.userMail,label:req.params.label},(err,todo)=>{

        if (err) throw err;


        // res.json(todos);


    })

};

exports.deleteTodo = (req,res)=>{
    Todo.findOneAndRemove({email : req.params.userMail,label: req.params.label},(err,todo)=>{
        if (err) throw err;

        res.json({info: 'Success'});

    })
};



