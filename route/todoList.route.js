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
router.route('/delete/:id').get(function(req, res){
    Todos.findByIdAndRemove({_id: req.params.id}, function(err, todos){
        if (err) res.json({err})
        else res.json('Sucessfully!');
    })
})
router.route('/update/:id').post(function(req,res){
    Todos.findById(req.params.id, function(err, todos){
        if (!todos){
            res.status(404).send("data is not found");
        }
        else{
            todos.title=req.body.title;
            todos.isChecked=req.body.isChecked;
            todos.timeCreate=req.body.timeCreate;
            todos.save()
            .then(item=>{
                res.status(200).json({'item': 'item in added successfully'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
        }
    })
})
module.exports= router;
