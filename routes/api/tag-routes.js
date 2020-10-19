const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags

  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id','product_name','price','stock','category_id'],
        through: ProductTag,
        as:'products',
      }
    ]
  })
  .then(dbTagData=>{
      if(!dbTagData){
        res.status(404).json({message:'Not found !'});
        return;
      }
    res.json(dbTagData);
 })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    include: [
      {
        model: Product,
        attributes: ['id','product_name','price','stock','category_id'],
        through: ProductTag,
        as:'products',
      }
    ],
    where:{
      id:req.params.id
    }
  })
  .then(dbTagData=>{
    if(!dbTagData){
      res.status(404).json({message:'Not found !'});
      return;
    }
    res.json(dbTagData)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then(dbTagData=>{
    console.log(dbTagData);
    res.json(dbTagData)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
    tag_name:req.body.tag_name
    },
    {
      where:{
        id:req.params.id
      }
    }
  )
    .then(dbTagData =>{
    if(!dbTagData){
      res.status(404).json({message:'Not found !'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(dbTagData=>{
    if(!dbTagData){
      res.status(404).json({message:"not found"});
      return;
    }
    res.json(dbTagData)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
