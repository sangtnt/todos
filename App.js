require('dotenv').config()
var express = require('express');
var todoData= require('./api/route/todoList.route');
var app = express();
app.use('/api/todoData', todoData);
const PORT= process.env.PORT;
app.listen(PORT, console.log('app listening on port '+PORT));