const db = require('../db/models');
const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        db.Category.findAll({
            include: db.File
        })
            .then(response => {
                return res.render('categories', {categories: response});
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            });
    },

    create: (req, res, next) => {
        return res.render('formCategory');
    },
    
    store: (req, res, next) => {
        const errors = validationResult(req);
        if(errors){
            console.log(errors);
        }
        const { title, permission } = req.body;
        db.Category.create({ title, permission })
        .then(() => {
            return res.redirect('/categorias');
        });
    },
    edit: (req, res, next) => {
        const id = req.params.id;
        db.Category.findByPk(id)
            .then(response => {
                return res.render('updateCategory', { category: response });
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },
    
    update: (req, res, next) => {
        const { title, permission } = req.body;
        const id = req.params.id;
        db.Category.update({title, permission},{where:{id}})
            .then(response => {
                if(response[0]){
                    return res.redirect('/categorias');
                }else{
                    return res.send("Error al actualizar la categoría")
                }
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        db.Category.destroy({where:{id}})
            .then(() => {
                return res.redirect('/categorias');
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },
}