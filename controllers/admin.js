const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body
  const product = new Product(null, title, imageURL, price, description)
  product.save()
  res.redirect('/')
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodID = req.params.productID
  Product.findByID(prodID, (prod) => {
    if (!prod) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: prod,
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const { productID, title, price, imageURL, description } = req.body
  const updatedProduct = new Product(
    productID,
    title,
    imageURL,
    price,
    description,
  )
  updatedProduct.save()
  res.redirect('/admin/products')
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

exports.postDeleteProduct = (req, res, next) => {
  const { productID } = req.body
  Product.deleteByID(productID)
  res.redirect('/admin/products')
}
