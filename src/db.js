const Sequelize = require('sequelize')
const ContactModel = require('../models/Contact')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DB_TYPE
  }
);

const Contact = ContactModel(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {
  console.log("Database tables synced")
})

module.exports = {
  Contact
}
