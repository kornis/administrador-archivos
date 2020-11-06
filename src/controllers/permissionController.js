const db = require('../db/models');

module.exports = {
    index: (req, res) => {
        db.Permission.create({
            typeUser: "teacher"
        }).then(result => console.log(result))
        /* db.Category.findAll()
            .then(result => {
                console.log(result);
            }) */
    }
}