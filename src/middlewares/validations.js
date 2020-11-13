const { check, checkSchema, body } = require('express-validator');

const categoryValidation = [
    check('title')
        .notEmpty()
        .withMessage('El campo Título no puede estar vacío.').bail()
        .isLength({min:3})
        .withMessage('El Título debe tener como mínimo 3 caracteres.')
];

const fileValidation = [
    checkSchema({
        'file': {
            custom: {
                options: (_, {req}) => req.file != undefined,
                errorMessage: "Es obligatorio subir un archivo."
            }
        },
        'category': {
            custom: {
                options: (value) => value != undefined,
                errorMessage: "Debe seleccionar una categoría."
            }      
        },
        'name': {
            in: ['body'],
            notEmpty: {
                errorMessage: "Debe escribir un nombre para el archivo.",
            }
        }
    })
];

module.exports = [categoryValidation, fileValidation]
