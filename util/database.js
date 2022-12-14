const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-store', 'root', 'nirmalya', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize
