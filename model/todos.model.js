var mongoose= require('mongoose');
var todos = new mongoose.Schema({
    title: {
        type:String
    },
    isChecked: {
        type:Boolean
    },
    timeCreate:{ 
        type:String
    }
});
var Todos = mongoose.model('Todos', todos, 'todos-list');

module.exports= Todos;