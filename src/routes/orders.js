const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
      message: 'Ordere were fetch'
   });
});

router.post('/', (req, res, next) => {
   const order = {
      productId:req.body.productId,
      quantity: req.body.quantity
   }
   res.status(200).json({
      message: 'Order was created'
   });
});

router.get('/:orderId', (req, res, next) => {
   const id = req.params.orderId;
   if(id === "spesial") {
      res.status(200).json({
         message: ' You discovered the spesial',
         id:id
      })
   }else{
      res.status(200).json({
         message:'Not Discovered'
      })
   }
})

router.patch('/:orderId', (req, res, next) => {
   res.status(200).json({
      message:'Updated success'
   })
})

router.delete('/:orderId', (req, res, next) => {
   res.status(200).json({
      message: 'Deleted success'
   })
})

module.exports = router;