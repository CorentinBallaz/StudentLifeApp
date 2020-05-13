var express         = require('express');
var   routes          = express.Router();
var userController  = require('../controllers/user-controller');
var passport	    = require('passport');
var todoController  = require('../controllers/todo-controller');
var adeController = require('../controllers/ade-controller');
var eadController = require('../controllers/ead-controller');
var structureController = require('../controllers/courses-controller');
var marksController = require('../controllers/marks-controller')
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

routes.get('/userFormation/:userID',(req,res)=>{
    userController.getFormation(req,res);
})
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
    adeController.getEventsAde(req,res);
});

routes.get('/getFiliere',(req,res)=>{
    adeController.getAllEventsAde(req,res);
});

routes.get('/getEad',(req,res)=>{
    eadController.getEventsEad(req,res);
})

routes.get('/getAde/coursesNumber/:userID&:numberWeek',(req,res)=>{

    adeController.getCoursesNumber(req,res);
})

routes.get('/getEad/:userID&:numberWeek',(req,res)=>{
    eadController.getEventsFromDate(req,res);
})

routes.get('/getStructure/:userID',(req,res)=>{
    structureController.getStructureBySpe(req,res);
})
routes.get('/getMarks/:userID',(req,res)=>{
    marksController.getMarks(req,res)
})





module.exports = routes;
