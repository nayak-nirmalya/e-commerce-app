const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body
  const product = new Product(title, imageURL, price, description)
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}
