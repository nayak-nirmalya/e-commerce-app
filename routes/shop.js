const productsController = require('../controllers/products')

const express = require('express')

const router = express.Router()

router.get('/', productsController.getProducts)

module.exports = router
