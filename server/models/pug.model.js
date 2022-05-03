const Sequelize = require('sequelize')
const db = require('./database')
const Coffee = require('./coffee.model')

const Pug = db.define('pugs', {
  name: {
    type:Sequelize.STRING,
    allowNull:false
  },
  age: {
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  biography: {
    type:Sequelize.TEXT,
  }
})
Pug.prototype.setFavoriteCoffee =  function (coffee) {
   this.favoriteCoffeeId = coffee.id
}
Pug.prototype.isPuppy = function () {
  return this.age < 2
}
Pug.prototype.shortBio = function () {
  let str = ''
  let bio = this.biography
  for(let i = 0; i<bio.length; i++){
    if(bio[i] === '.' ||bio[i] === '!' ||bio[i] === '?'){
      return str
    }
    str+=bio[i]
  }
}
Pug.findByCoffee = function (coffee){
 return this.findAll({
   include: {
     model: Coffee,
     as:"favoriteCoffee",
     where: {
       name:coffee
     }
   }
 })
}
Pug.beforeSave(pug =>{
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1)
})
module.exports = Pug
