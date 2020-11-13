const db = require('../db/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        let limit = Number(req.query.limit) || 5;
        let page = 1;
        if (req.query.page && Number(req.query.page) > 1) {
            page = Number(req.query.page);
        }

        db.File.findAll({
            limit: limit + 1,
            offset: (page - 1) * limit
        })
            .then(response => {
                const rows = response.length;
                rows > limit ? response.pop() : null;
                return res.render('files', {
                    files: response,
                    prev: page > 1 ? `?limit=${limit}&page=${page - 1}` : null,
                    next: rows > limit ? `?limit=${limit}&page=${page + 1}` : null
                });
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            });
    },

    uploadFile: (req, res) => {
        db.Category.findAll()
            .then(response => {
                return res.render('uploadFile', { categories: response });
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
    },

    store: async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.errors.length > 0) {
            req.flashMsg(errors.errors)
            return res.redirect('back');
        }

        let obj = {
            name: req.body.name,
            path: '/files/' + req.file.filename,
            categoryId: req.body.category
        }

        let response = await db.File.create(obj);
        if (response == 0) {
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
                        return res.render('updateFile', { file: response, categories });
                    })
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

        const id = req.params.id;
        const { name, category } = req.body;
        let fileObj = {
            name,
            category,
        }
        if (req.file) {
            const { filename } = req.file;
            fileObj.path = '/file/' + filename;
        }

        db.File.update(fileObj, { where: { id } })
            .then(response => {
                if (response[0]) {
                    return res.redirect('/archivos');
                } else {
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
        db.File.destroy({ where: { id } })
            .then(() => {
                return res.redirect('/archivos');
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            });
    },
    showDeletedFiles: (req, res, next) => {
        let limit = Number(req.query.limit) || 10;
        let page = 1;
        if (req.query.page && Number(req.query.page) > 1) {
            page = Number(req.query.page);
        }

        db.File.findAll({
            paranoid:false,
            where:{
                deletedAt: {
                    [Op.not]: null
                }
            },
            limit: limit + 1,
            offset: (page - 1) * limit
        })
            .then(response => {
                const rows = response.length;
                rows > limit ? response.pop() : null;
                console.log(rows)
                return res.render('recoverFiles', {
                    files: response,
                    prev: page > 1 ? `?limit=${limit}&page=${page - 1}` : null,
                    next: rows > limit ? `?limit=${limit}&page=${page + 1}` : null
                })
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            });
    },
    restoreDeletedFile: async (req, res, next) => {
        let object = await db.File.findByPk(req.params.id, { paranoid: false });
        if(object) {
            let restored = await object.restore();
            if(restored){
                return res.redirect('/archivos');
            }
            else{
                req.flashMsg([{msg:"Error al intentar recuperar el archivo"}]);
                return res.redirect('back');
            }
        }
        req.flashMsg([{msg: "No se encontró el archivo solicitado"}]);
        return res.redirect('back');
    }
}
