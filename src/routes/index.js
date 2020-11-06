var express = require('express');
var router = express.Router();
const permissionController = require('../controllers/permissionController');
const categoryController = require('../controllers/categoryController');
const fileController = require('../controllers/fileController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/permission', permissionController.index);
router.get('/files', fileController.index);
router.get('/categories', categoryController.index);


module.exports = router;
