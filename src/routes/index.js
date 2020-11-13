var express = require('express');
var router = express.Router();
/* const permissionController = require('../controllers/permissionController'); */
const categoryController = require('../controllers/categoryController');
const fileController = require('../controllers/fileController');
const indexController = require('../controllers/indexController');
const [categoryValidator, fileValidator] = require('../middlewares/validations');
const uploadFile = require('../assets/multer');

/* GET home page. */
router.get('/', indexController.index);


//files routes
router.get('/archivos', fileController.index);
router.get('/archivos/subir', fileController.uploadFile);
router.get('/archivos/:id', fileController.edit);
router.post('/archivos', uploadFile.single('file'), fileValidator, fileController.store);
router.put('/archivos/:id', uploadFile.single('file'), fileController.update);
router.delete('/archivos/:id', fileController.delete);

//categories routes
router.get('/categorias', categoryController.index);
router.get('/categorias/crear', categoryController.create);
router.get('/categorias/:id', categoryController.edit);
router.post('/categorias', categoryValidator, categoryController.store);
router.put('/categorias/:id', categoryValidator, categoryController.update);
router.delete('/categorias/:id', categoryController.delete);

module.exports = router;

// permissions routes
/*router.get('/permisos', permissionController.index);
router.get('/permisos/crear', permissionController.create);
router.get('/permisos/:id', permissionController.edit);
router.put('/permisos/:id', permissionController.update);
router.post('/permisos', permissionController.store);
router.delete('/permisos/:id', permissionController.delete);*/