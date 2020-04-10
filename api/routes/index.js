var express         = require('express');
var   routes          = express.Router();
var userController  = require('../controllers/user-controller');
var passport	    = require('passport');
var todoController  = require('../controllers/todo-controller');
var adeController = require('../controllers/ade-controller');


routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
// this request is allowed when the person is authenticated
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
routes.get('/email', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: req.user.email});
});

routes.post('/createTodo',(req,res)=>{
    todoController.createTodo(req,res)
});

routes.get('/getAde',(req,res)=>{
	console.log("Request getAde");
	adeController.getEvents(req,res);
});

routes.get('/todos/:userMail',(req,res)=>{
    todoController.getTodos(req,res);
});
routes.get('/todo/:userMail&:label',(req,res)=>{
    todoController.getTodo(req,res);
});

module.exports = routes;
