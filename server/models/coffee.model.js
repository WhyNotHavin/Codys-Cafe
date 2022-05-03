const Sequelize = require('sequelize')
const db = require('./database')

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.STRING,
    allowNull:false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[]
  }

})
Coffee.prototype.getIngredients = function () {
  return this.ingredients.join(', ')
}

Coffee.findByIngredient = function (ingredient) {
  return this.findAll({
    where:{
      ingredients: {
       [Sequelize.Op.contains]:[ingredient]
      }
    }
  })
}
Coffee.beforeSave((coffee) => {
  if(!coffee.ingredients.includes('love')){
    coffee.ingredients.push('love')
  }
})
module.exports = Coffee
