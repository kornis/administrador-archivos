const db = require('../db/models');

module.exports = {
    index: async (req, res) => {
        const files = await db.File.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
        const categories = await db.Category.findAll({ include: db.File, limit: 5, order: [['createdAt', 'DESC']] });
        console.log("archivos", categories.length);
        return res.render('index', { categories, files });
    }
}