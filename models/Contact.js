module.exports = (sequelize, type) => {
  return sequelize.define('contact', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    phone: type.INTEGER
  })
}
