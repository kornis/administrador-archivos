const db = require('../db/models');

module.exports = {
    index: (req, res) => {
        db.Permission.findAll()
            .then(response => {
                return res.render('permissions', {permissions: response});
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            })
            
    },
    edit: (req, res, next) => {
        db.Permission.findByPk(req.params.id)
            .then(response => {
                return res.render('updatePermission', {permission: response});
            })
            .catch(error => {
                console.error(error);
                return res.render('error');
            });
    },
    create: (req, res, next) => {
        return res.render('formPermission');
    },
    store: (req, res, next) => {
        db.Permission.create({
            
        })
    },
    update: (req, res, next) => {

    },
    delete: (req, res, next) => {
        db.Permission.destroy(req.params.id)
        .then(response => {
            return res.redirect('/permisos');
        })
    },
}