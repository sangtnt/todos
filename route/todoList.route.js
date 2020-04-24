var express= require('express');
var router = express.Router();
var Todos= require('../model/todos.model');
router.route('/').get(function(req, res){
    Todos.find().sort({timeCreate: 'desc'}).then(todos=>{
        res.json({todoData: todos});
    })
})
router.route('/insert').post(function(req,res){
    let item = new Todos(req.body);
    item.save()
    .then(item=>{
        res.status(200).json({'item': 'item in added successfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
})
module.exports= router;
