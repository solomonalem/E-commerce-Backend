const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

   Category.findAll({})
      .then(dbCategoryData=>{
          if(!dbCategoryData){
            res.status(404).json({message:'Not found !'});
            return;
          }
        res.json(dbCategoryData);
     })
   
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

   Category.findOne({
     where:{
       id:req.params.id
     }
   })
   .then(dbCategoryData=>{
     if(!dbCategoryData){
       res.status(404).json({message:'Not found !'});
       return;
     }
     res.json(dbCategoryData)
   })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name:req.body.category_name
  })
  .then(dbCategoryData=>{
    console.log(dbCategoryData);
    res.json(dbCategoryData)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.update(
      {
      category_name:req.body.category_name
      },
      {
        where:{
          id:req.params.id
        }
      }
    )
      .then(dbCategoryData =>{
      if(!dbCategoryData){
        res.status(404).json({message:'Not found !'});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    })
  
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
      where:{
        id: req.params.id
      }
    })
    .then(dbCategoryData=>{
      if(!dbCategoryData){
        res.status(404).json({message:"not found"});
        return;
      }
      res.json(dbCategoryData)
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
