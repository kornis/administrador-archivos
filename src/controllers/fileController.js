const db = require('../db/models');
const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        db.File.findAll()
            .then(response => {
                return res.render('files', {files: response});
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            });
    },
    
    uploadFile: (req, res) => {
        db.Category.findAll()
            .then(response => {
                return res.render('uploadFile', {categories: response});
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    }, 

    store: async (req, res, next) => {
        const errors = validationResult(req);
        if(errors.errors.length > 0){
            req.flashMsg(errors.errors)
            return res.redirect('back');
        }

        let obj = {
            name: req.body.name,
            path: '/files/'+ req.file.filename,
            categoryId: req.body.category
        }
            
            let response = await db.File.create(obj);
            if(response == 0){
                return res.render('error');
            }

        return res.redirect('/archivos');
    },
    edit: (req, res, next) => {
        const id = req.params.id;
        db.Category.findAll()
            .then(categories => {
                db.File.findByPk(id)
                    .then(response => {
                        return res.render('updateFile', {file: response, categories});
                    })
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },
    update: (req, res, next) => {

        const errors = validationResult(req);
        if(errors.errors.length > 0){
            req.flashMsg(errors.errors)
            return res.redirect('back');
        }

        const id = req.params.id;
        const { name, category } = req.body;
        let fileObj = {
            name,
            category,
        }
        if(req.file){
            const { filename } = req.file;
            fileObj.path = '/file/' + filename;
        }

        db.File.update(fileObj,{where:{id}})
            .then(response => {
                if(response[0]){
                    return res.redirect('/archivos');
                }else{
                    return res.send("no se pudo actualizar");
                }
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        db.File.destroy({where:{id}})
         .then(() => {
             return res.redirect('/archivos');
         })
         .catch(error => {
             console.error(error);
             return res.render('error');
         });
    },
}
