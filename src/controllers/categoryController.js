const db = require('../db/models');
const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        let limit = Number(req.query.limit) || 5;
        let page = 1;
        if (req.query.page && Number(req.query.page) > 1) {
            page = Number(req.query.page);
        }

        db.Category.findAll({
            include: db.File,
            limit: limit + 1,
            offset: (page - 1) * limit
        })
            .then(response => {
                const rows = response.length;
                rows > limit ? response.pop() : null;
                return res.render('categories', {
                    categories: response,
                    prev: page > 1 ? `?limit=${limit}&page=${page - 1}` : null,
                    next: rows > limit ? `?limit=${limit}&page=${page + 1}` : null
                });
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
        if (errors.errors.length > 0) {
            req.flashMsg(errors.errors)
            return res.redirect('back');
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
        const errors = validationResult(req);
        if (errors.errors.length > 0) {
            req.flashMsg(errors.errors)
            return res.redirect('back');
        }

        const { title, permission } = req.body;
        const id = req.params.id;
        db.Category.update({ title, permission }, { where: { id } })
            .then(response => {
                if (response[0]) {
                    return res.redirect('/categorias');
                } else {
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
        db.Category.destroy({ where: { id } })
            .then(() => {
                return res.redirect('/categorias');
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },
}