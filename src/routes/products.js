const express = require('express');
const router = express.Router();
const monggose= require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
   Product
      .find()
      .exec()
      .then(docs => {
         res.status(200).json({
            docs
         })
      })
      .catch(err => {
         res.status(500).json({
            message:'error'
         })
      })
});

router.post('/', (req, res, next) => {
   const product = new Product({
      _id:new monggose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price
   })
   product
      .save()
      .then(res => {
         console.log(res)
      })
      .catch(err => console.log(err));

   res.status(201).json({
      message: 'Handling Post requests to /products',
      createdProduct: product
   });
});

router.get('/:productId', (req, res, next) => {
   const id = req.params.productId;
   Product.findById(id)
      .exec()
      .then(doc => {
         console.log("From database", doc);
         if(doc) {
            res.status(200).json(doc);
         }else{
            res.status(404).json({
               message: 'No Invalid entry id'
            })
         }
      })
      .catch(err => {
         res.status(500).json({
            message:err
         })
      })
})

router.put('/:productId', (req, res, next) => {
   const id = req.params.productId;
   Product.update({_id:id}, {name:req.body.name, price:req.body.price})
      .exec()
      .then(result => {
         res.status(200).json({
            result
         })
      })
      .catch(err => {
         res.status(500).json({
            err
         })
      })
})

router.delete('/:productId', (req, res, next) => {
   const id = req.params.productId;
   Product.remove({_id:id})
      .exec()
      .then( result => {
         res.status(200).json({
            message:'Success'
         })
      })
      .catch(err => {
         res.status(500).json({
            message:'delete data'
         })
      })
})

module.exports = router;