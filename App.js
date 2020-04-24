require('dotenv').config()
var express = require('express');
var todoData= require('./route/todoList.route');
var app = express();
var mongoose = require('mongoose');
var bodyParser= require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
mongoose.connect('mongodb://localhost/todos', {useNewUrlParser: true});

app.use('/todoData', todoData);
const PORT= process.env.PORT;
app.listen(PORT, console.log('app listening on port '+PORT));