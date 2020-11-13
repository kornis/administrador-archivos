const db = require('../db/models');

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

    store: (req, res, next) => {
        console.log(req.body)
        const store = async function(model, obj){
            let response = await model.create(obj);
            if(response){
                return response;
            }
            return false;
        }

        req.files.forEach(async (file) => {
            let obj = {
                name: req.body.name,
                path: '/files/'+file.filename,
                categoryId: req.body.category
            }
            let response = await store(db.File, obj);
            if(response == false){
                return res.render('error');
            }
        });

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
