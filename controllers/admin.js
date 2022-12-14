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
  Product.create({
    title: title,
    imageURL: imageURL,
    price: price,
    description: description,
  })
    .then((res) => console.log('Created Product!'))
    .catch((err) => console.error(err))
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const prodID = req.params.productID
  Product.findByPk(prodID)
    .then((prod) => {
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
    .catch((err) => console.error(err))
}

exports.postEditProduct = (req, res, next) => {
  const { productID, title, price, imageURL, description } = req.body
  Product.findByPk(productID)
    .then((prod) => {
      prod.title = title
      prod.price = price
      prod.imageURL = imageURL
      prod.description = description
      return prod.save()
    })
    .then((ret) => {
      console.log('Updated Product!')
      res.redirect('/admin/products')
    })
    .catch((err) => console.error(err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      })
    })
    .catch((err) => console.error(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const { productID } = req.body
  Product.deleteByID(productID)
  res.redirect('/admin/products')
}
