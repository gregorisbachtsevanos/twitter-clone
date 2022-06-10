const mongoose = require('mongoose')

module.exports.homepage = async(req, res) => {
    res.render('index_view')
}