const express = require('express');
const router = express.Router();
const monggose= require('mongoose');

const Admin = require('../models/admin');

router.get('/', (req, res, next) => {
   Admin
      .find()
      .exec()
      .then(docs => {
         res.status(200).json({
            code:200,
            message:'success',
            payload:docs
         })
      })
      .catch(err => {
         res.status(500).json({
            message:'error'
         })
      })
});

router.post('/', (req, res, next) => {
   const admin = new Admin({
      _id:new monggose.Types.ObjectId(),
      NIK: req.body.NIK,
      name:req.body.name,
      username:req.body.username,
      email:req.body.email
   })
   admin
      .save()
      .then(res => {
         console.log(res)
      })
      .catch(err => console.log(err));

   res.status(201).json({
      code:200,
      message: 'success',
      payload: admin
   });
});

router.get('/:adminId', (req, res, next) => {
   const id = req.params.adminId;
   Admin.findById(id)
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

router.put('/:adminId', (req, res, next) => {
   const id = req.params.adminId;
   Admin.update({_id:id}, {
      NIK: req.body.NIK,
      name:req.body.name,
      username:req.body.username,
      email:req.body.email
   })
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

router.delete('/:adminId', (req, res, next) => {
   const id = req.params.adminId;
   Admin.remove({_id:id})
      .exec()
      .then( result => {
         res.status(200).json({
            code:200,
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