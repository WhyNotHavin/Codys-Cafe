const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!
router.get('/ingredients/:ingredientName', async (req,res,next) => {
  try {
    let list  = await Coffee.findByIngredient(req.params.ingredientName)
    res.status(200).json(list)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', async (req,res,next) => {
  let coffee = await Coffee.findByPk(req.params.id)
  if(!coffee){
    res.status(404)
    next()
  } else {
    res.status(200).json(coffee)
  }
})

router.get('/', async(req,res,next) => {
  let coffeeList = await Coffee.findAll()
  res.status(200).json(coffeeList)
})
router.post('/', async (req,res,next) => {
 let newCoffee = await Coffee.create({
   name: req.body.name
 })
 res.status(201).send(newCoffee)
})
module.exports = router
