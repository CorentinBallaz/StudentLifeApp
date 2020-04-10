var Todo = require('../models/todo');
var User = require('../models/user')



exports.createTodo = (req,res)=>{


    User.findOne({email:req.body.email},(err,user) =>{

        if (err) {
            return res.status(400).send({ 'msg': err });
        }else if (!user){
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
        else {
            let newTodo = Todo(req.body);
            newTodo.save((err,user) =>{
                if (err) {
                    console.log("pb 2");
                    return res.status(400).json({ 'msg': err });
                }
                return res.status(201).json(user);
            });
        }
    })


};

exports.getTodos = (req,res)=>{

    Todo.find({email:req.params.userMail},(err,todos)=>{

        if (err) throw err;


        res.json(todos);

    })

}

exports.getTodo = (req,res)=>{

    Todo.find({email:req.params.userMail,label:req.params.label},(err,todo)=>{

        if (err) throw err;


        res.json(todo);

    })

}



