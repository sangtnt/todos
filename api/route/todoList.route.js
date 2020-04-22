var express= require('express');
var router = express.Router();
var controller = require('../controller/todoList.controller');
router.get('/', controller.index);

module.exports= router;
