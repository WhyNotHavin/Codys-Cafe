const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!


router.get('/:id', async (req,res,next) => {
  try {
    let pug = await Pug.findByPk(req.params.id)
    if(!pug){
      res.status(404).json('Pug Not Found!')
    } else {res.status(200).json(pug)}

  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const numDestroyed = await Pug.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!numDestroyed){
      const err = Error('Pug not found')
      err.status = 404
      throw err
    }
    res.sendStatus(204)
  } catch(err) {
    next(err)
  }
})
// router.delete('/:pugId', async (req,res,next) => {
//   try {
//     let pug = await Pug.findByPk(2)
//     if(pug !== null){
//       let dum = await pug.detroy()
//       res.status(204).send(dum)

//       next()
//     }else {
//       res.status(404).send('No doug here!')
//       next()
//     }
//   } catch (error) {
//     console.error(error)
//     next()
//   }
// })

router.put('/:pugId', async (req,res,next)=>{
try {
    let pug = await Pug.findByPk(req.params.pugId)
    const ChagnedPug = await pug.update(req.body)
    if(!ChagnedPug){
      res.status(404)
      next()
    } else{res.status(200).send(ChagnedPug)}

} catch (error) {
  console.error(error)
  res.status(404)
  next()
}
})


router.get('/', async (req,res,next) => {
try {
  const pugs = await Pug.findAll()
  res.status(200).json(pugs)
} catch (error) {
  next(error)
}
})

router.post('/', async (req,res,next) => {
  let newPug = await Pug.create(req.body)
  if(newPug){
    res.status(201).json(newPug)
  }
})
router.get('/favoriteCoffee/:coffee', async (req,res,next) =>{
  try {
    let pug = await Pug.findByCoffee(req.params.coffee)
    res.status(200).json(pug)
  } catch (error) {
    console.error(error)
  }
})
module.exports = router
