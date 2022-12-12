const shopController = require('../controllers/shop')

const express = require('express')
const router = express.Router()

router.get('/', shopController.getIndex)
router.get('/products', shopController.getProducts)
router.get('/products/:productID', shopController.getProduct)
router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.get('/orders', shopController.getOrders)
router.get('/checkout', shopController.getCheckout)

module.exports = router
