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
// ------------- Todos Request ------------------------------
routes.post('/createTodo',(req,res)=>{
    todoController.createTodo(req,res)
});

routes.get('/todos/:userID',(req,res)=>{
    todoController.getTodos(req,res);
});
routes.get('/todo/:userID&:todoID',(req,res)=>{
    todoController.getTodo(req,res);
});
routes.delete('/todo/:userID&:todoID',(req,res)=>{
   todoController.deleteTodo(req,res);
});

routes.put('/todo/:todoID',(req,res)=> {
    console.log("passé ici");
    todoController.updateTodo(req, res);
});

routes.get('/getAde',(req,res)=>{
    adeController.getEvents(req,res);
});

module.exports = routes;
